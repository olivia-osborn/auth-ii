const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const knex = require("knex")
const server = express();

server.use(helmet());
server.use(express.json());

server.post("/api/register", (req, res) => {
    res.send("it's alive!")
})

// server.post("/api/login", (req, res) => {
//     res.send("it's alive!")
// })

// server.post("/api/users", (req, res) => {
//     res.send("it's alive!")
// })

module.exports = server;