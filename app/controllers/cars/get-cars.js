'use strict';

const carsRepository = require('../../repositories/cars-repository');

async function getCars(req, res) {
  const cars = await carsRepository.findAll();

  res.send(cars);
}

module.exports = getCars;