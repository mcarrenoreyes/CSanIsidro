const express = require('express');
const router = express.Router();


const Usuario = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');

}); //Dirección de inicio de sesión usuarios

router.post('/users/signin', passport.authenticate('local', {

    successRedirect: '/',
    failureRedirect: 'users/signin',
    failureFlash: true

}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');

}); //Dirección de registro de usuarios

router.post('/users/signup', async (req, res) => {

    const {rName, rLast, rEmail, rUser, rPass, crPass} = req.body;
    const errors = [];

    if(rPass!=crPass){

        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if(rPass.length<4){

        errors.push({text: 'La longitud de la contraseña debe ser mayor a 4 caracteres'});
    }
    if(rName.length<3){

        errors.push({text: 'La longitud del nombre debe ser mayor a 3 caracteres'});
    }
    if(rLast.length<3){

        errors.push({text: 'La longitud del apellido debe ser mayor a 3 caracteres'});
    }

    if(rUser.length<4){

        errors.push({text: 'La longitud del usuario debe ser mayor a 4 caracteres'});
    }

    if(errors.length>0){

        res.render('users/signup', {errors, rName, rLast, rEmail, rUser, rPass, crPass});

    }
    else{
        const emailUsuario = await Usuario.findOne({rEmail: rEmail});

        if(emailUsuario){
            req.flash('error_msg', 'El email ya se encuentra en uso');
            res.redirect('signup');
            console.log('Email en uso')
        }

        const nuevoUsuario = new Usuario({rName, rLast, rEmail, rUser, rPass, crPass});
        nuevoUsuario.rPass = await nuevoUsuario.encryptPassword(rPass);
        await nuevoUsuario.save();
        req.flash('success_msg', 'Estás registrado');
        res.redirect('signin');
    }    

});

module.exports = router; 