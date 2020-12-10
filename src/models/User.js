const mongoose = require('mongoose');

const {Schema} = mongoose;

const bcrypt = require('bcryptjs'); //Modulo para encriptar contraseñas

const Usuario = new Schema({
    
    rName: { type: String, required: true},
    rLast: { type: String, required: true},
    rEmail: { type: String, required: true},
    rUser: { type: String, required: true},
    rPass: { type: String, required: true},
    crPass: { type: String, required: true}

});

Usuario.methods.encryptPassword = async (rPass) => {

    const salt = await bcrypt.genSalt(10); //Se entrega contraseña a encriptar
    const hash = bcrypt.hash(rPass, salt); //Se encripta con método hash
    return hash; //Se devuelve contraseña encriptada
};

Usuario.methods.matchPassword = async function (rPass) {

    return await bcrypt.compare(rPass, this.rPass);

};

module.exports = mongoose.model('Usuario', Usuario);