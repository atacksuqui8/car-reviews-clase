'use strict';

const express = require('express');

const registerUsers =require( '../controllers/users/register-users');

const router = express.Router();

router.route('/register')
    .post((req, res) => registerUsers(req, res));


module.exports = router;