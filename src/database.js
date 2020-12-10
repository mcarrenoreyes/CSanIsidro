const mongoose = require('mongoose'); //Conectando a base de datos

mongoose.connect('mongodb://localhost/notes-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false //Importante agregar esto para moongose

}) //El nombre cambia según la base de datos

    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

