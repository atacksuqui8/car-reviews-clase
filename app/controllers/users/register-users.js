'use strict'

const Joi = require('joi');

const {createUsers,findByUserEmail}  = require ('../../repositories/users-repository');
const bcrypt = require('bcryptjs')
const schema = Joi.object().keys({

name :Joi.string().alphanum().min(3).max(20).required(),
email : Joi.string().email().required(),
password : Joi.string().min(4).max(20).required(),
repeatPassword : Joi.ref('password')
});

async function registerUsers (req,res) {

    try {
       await schema.validateAsync(req.body);

       const {name,email,password} = req.body; 

       const existUser = await findByUserEmail(email);

       if(existUser) {
           const error = new Error('Ya existe un usuario con ese email');
           error.status=409;
           throw error;
       }

       const passwordHash = await bcrypt.hash(password,12);
res.status(201).send(passwordHash);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }


}

module.exports=registerUsers