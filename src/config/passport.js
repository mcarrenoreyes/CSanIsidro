const passport = require('passport'); //Módulo que sirve para signin
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/User');

passport.use(new LocalStrategy({

    usernameField: 'rUser'

}, async (rUser, rPass, done) => {

    const user = await Usuario.findOne({rUser: rUser});

    if(!user){

        return done(null , false, {message: 'Usuario no existe'} );
    }

    else{

        const match = await user.matchPassword(rPass);

        if(matach){

            return done(null, user);
        }

        else{

            return done(null, false, {message: 'Contraseña incorrecta'});
        }
    }

}));

passport.serializeUser((user, done) => {

    done(null, user.id);

});

passport.deserializeUser((id, done) => {

    User.findById(id, (err, user) => {
        done(err, user);

    });

});