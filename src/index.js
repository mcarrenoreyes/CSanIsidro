const express = require('express');
const path = require('path'); //Sirve para indicar rutas
const exphbs = require('express-handlebars'); //Configuración de handlebars o "hbs"
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Inicializaciones

const app = express();

require('./database');

require('./config/passport');

// Settings

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({

    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'

}));

app.set('view engine', '.hbs'); //Handlebars

// Middlewares

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method')); //Sirve para que los formularios envíen otro tipo de método (no solo get y post)
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true

})); // Permite autenticar al usuario

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Global Vars

app.use((req, res, next) => {

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');

    next();

});

// Routes

app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files

app.use(express.static(path.join(__dirname, 'public')));

//Server init

app.listen(app.get('port'), () => {

    console.log('Server on port', app.get('port'));

});