const mongoose = require('mongoose');

const {Schema} = mongoose;

const Camion = new Schema({
    
    nombreCamion: { type: String, required: true},
    nombreMarca: { type: String, required: true},
    nombreModelo: { type: String, required: true}

});

module.exports = mongoose.model('Camion', Camion);