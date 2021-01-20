'use strict'

const database = require('../infrastructure/database');
async function findALlUsers(params) {
    return 'getUsers';
}

async function createUsers(params) {
    return 'registerUsers';
}
async function findByUserEmail (email) {
    //LLAMADA A BASE DE DATOS
    return false;
}
module.exports={findALlUsers,createUsers,findByUserEmail}