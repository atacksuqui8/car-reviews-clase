'use strict';

const database = require('../infrastructure/database');

async function create(car) {
  const pool = await database.getPool();
const {brand,model,year} = car;
  const query = 'INSERT INTO cars (brand,model,year) VALUES (?,?,?)';
  const [cars] = await pool.query(query,[brand,model,year]);
  console.log(cars);
  return cars.insertId;
}

async function findAll() {
  const pool = await database.getPool();
  console.log('hola');
  const query = 'SELECT * FROM cars';
  console.log(query);
  const [cars] = await pool.query(query);
  console.log(cars);
  return cars;
}

async function findById(id) {
  const pool = await database.getPool();

  const query = 'SELECT * FROM cars where id=?';
  const [cars] = await pool.query(query,id);

  return cars;
}

function removeById(id) {
  return true;
}

module.exports = {
  create,
  findAll,
  findById,
  removeById,
};
