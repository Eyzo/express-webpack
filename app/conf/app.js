const express = require('express');
const bodyParser = require('body-parser');
const Twig = require('./twig');


//Importation des controllers
const moviesController = require('../controllers/moviesController');

//Instance de l'application
const app = express();

app.set('views', __dirname + '/../views');

//Ajout du middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Parametrage du moteur de template
app.set('twig_option', {
    allow_async: true,
    strict_variables: false
});

//Dossiers static de l'application WEBPACK
app.use('/dist',express.static('./public/dist'));

//Dossier  static de l'application SIMPLE
app.use('/vendor', express.static('./public/vendor'));
app.use('/css', express.static('./public/css'));
app.use('/js',express.static('./public/js'));
app.use('/image',express.static('.public/image'));

//Ajout des différents controllers
app.use('/', moviesController);

module.exports = app;