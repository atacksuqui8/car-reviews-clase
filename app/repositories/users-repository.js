'use strict'

const database = require('../infrastructure/database');

async function findALlUsers(params) {
    return 'getUsers';
}

async function createUsers(name,email,password,role) {
    const pool = await database.getPool();
    const insertQuery = 'INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)';
    const [created] = await pool.query(insertQuery,[name,email,password,role]);

    return created.insertId;
}
async function findByUserEmail (email) {
    //LLAMADA A BASE DE DATOS
    const pool = await database.getPool();
    const query = 'SELECT * FROM users where email=?';
    const [user] = await pool.query(query,email);

    return user[0];
}
module.exports={findALlUsers,createUsers,findByUserEmail}