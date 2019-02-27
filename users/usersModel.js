db = require("../data/dbConfig");

function get() {
    return db("users");
};

function getBy(filter) {
    return db("users").where(filter);
};

function getById(id) {
    return db("users").where({id}).first();
};

async function add(user) {
    const [id] = await db("users").insert(user)
    return getById(id);
};

module.exports = {
    get,
    getBy,
    getById,
    add,
}