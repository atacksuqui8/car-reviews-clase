'use strict';

require('dotenv').config();
const carsRouter = require('./app/routes/cars-routes');
const usersRouter = require('./app/routes/users-routes');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
app.use(express.json());
const morgan = require('morgan');


const accessLogStream = fs.createWriteStream(path.join(__dirname,'./access.log'),{flags : 'a'});

app.use(morgan('combined', {stream:accessLogStream})); //combined, es lo mismo pero te da mas información.
const port = process.env.SERVER_PORT || 3080;

app.use('/api/v1/cars/', carsRouter);
app.use('/api/v1/users/', usersRouter);
//app.use('/api/v1/users/', usersRouter);

app.listen(port, () => console.log(`Listening ${port}...`));
