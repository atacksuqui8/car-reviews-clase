'use strict'

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { findByUserEmail } = require('../../repositories/users-repository');

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required()
});

async function loginUser(req, res) {
    try {
        await schema.validateAsync(req.body);
        const { email, password } = req.body;
        const user = await findByUserEmail(email);
        if (!user) {
            const error = new Error('No existe un usuariio registrado para ese email');
            error.code = 401;
            throw error;
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            const error = new Error('El campo password no es un numero valido');
            error.code = 401;
            throw error;
        }

        //CREAMOS UN TOKEN
        const secret = process.env.JWT_SECRET
        const { id, name, role } = user;
        const jwtTokenExpiration = '1m'; //DURACION DEL TEMA DE LA SESION SI NO HACES NADA POR EJEMPLO LA APLICACION DEL BANCO
        const payload = { id, name, role };

        const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });

        const response = {
            accesToken: token,
            expiresIn: jwtTokenExpiration
        };
        res.send(response);
        //const payload = jwt.verify(token,secret);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports = loginUser;
