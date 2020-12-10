const express = require('express');
const router = express.Router(); //Da un objeto que facilita la creación de rutas

const Camion = require('../models/Camiones'); //Importando objeto Camion de Camiones.js

router.get('/', (req, res) => {

    res.render('index');

}); //Función que muestra página principal

router.get('/about', (req, res) => {
   
    res.render('about');

}); //Función que muestra pestaña about "http://localhost:3000/About"

router.get('/contactos', (req, res) => {
   
    res.render('contactos');

}); //Función que muestra pestaña contactos

router.get('/servicios', (req, res) => {
   
    res.render('servicios');

}); //Función que muestra pestaña servicios

router.get('/camiones/agregarCamiones', (req, res) => {
   
    res.render('camiones/agregarCamiones');

}); //Función que muestra pestaña camiones

router.post('/camiones/agregarCamiones', async (req, res) => {
    const { nombreCamion, nombreMarca, nombreModelo}= req.body; //Guardando datos u atributos
    const errors = [];
    if(!nombreCamion){
        errors.push({text: 'Por favor escriba un nombre de camión'});
    } //alerta para solicitar completar datos
    if(!nombreMarca){
        errors.push({text: 'Por favor escriba un nombre de marca'});
    } //alerta para solicitar completar datos
    if(!nombreModelo){
        errors.push({text: 'Por favor escriba un nombre de modelo'});
    } //alerta para solicitar completar datos
    if(errors.length > 0){ //lista de errores valida si es que hay almenos un error (al menos un campo vacío)

        res.render('camiones/agregarCamiones', {
            errors,
            nombreCamion,
            nombreMarca,
            nombreModelo
        });

    }

    else{

        const nuevoCamion = new Camion({nombreCamion, nombreMarca, nombreModelo}); //Creando variable que almacena el objeto de camión
        await nuevoCamion.save(); //Guardando camión en la base de datos
        console.log(nuevoCamion); //Respuesta para validar correcto guardado en terminal
        res.redirect('camiones') //Respuesta web
    
    }

}); //Función que recibe los datos de camión agregado en agregarCamiones

router.get('/camiones/camiones', async (req, res) => {

    const camiones = await Camion.find().lean();
   
    res.render('camiones/camiones', {camiones});

}); //Función que muestra pestaña camiones

module.exports = router; 