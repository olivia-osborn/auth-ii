const express = require("express");
const helmet = require("helmet");
const cors = require("cors")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./data/dbConfig");
const Users = require("./users/usersModel");

const secret = "secret sauce"
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.post("/api/register", (req, res) => {
    let user = req.body;
    console.log(user)
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error);
        })
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        company: ["lambda"],
    };
    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, secret, options)
}

server.post("/api/login", (req, res) => {
    let {username, password} = req.body;

    Users.getBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)
            res.status(200).json({message: `Welcome ${user.username}`, token})
        } else {
            res.status(401).json({message: "invalid credentials"})
        }
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

function restricted(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: "you shall not pass!"})
            } else {
                req.decodedJwt = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({message: "you don't even go here!"})
    }
}

server.get("/api/users", restricted, (req, res) => {
    const users = Users.get()
    .then(users => {
        res.json(users)
    })
    .catch(error => {
        res.send(error)
    })
})

module.exports = server;