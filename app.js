//Importation des dépendances
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const Twig = require('twig');
const fs = require('fs');
const mongoose = require('mongoose');


//Importation des controllers
const moviesController = require('./app/controllers/moviesController');

//Instance de l'application
const app = express();

//Connection avec la bdd
mongoose.connect('mongodb+srv://Admin:berserk62155@cluster0-nddx4.mongodb.net/maBase?retryWrites=true&w=majority', { useUnifiedTopology: true ,useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', () => {
    console.error.bind(console, 'connection error:');
});

db.on('open',() => {
    console.log('vous êtes connecté');
});

//Configuration de Twig
Twig.extendFunction('last_bundle', function() {
    var stats = fs.statSync('./public/dist/bundle.js');
    var mtime = stats.mtime;
    var date = Date.parse(mtime);
    return date;
});

Twig.extendFilter('resume', function(value, params) {
    var strReduce = value.substr(0,150);
    let lastSpace = strReduce.lastIndexOf(' ');
    strReduce.substr(0,lastSpace);
    return `${strReduce}...`;
});

Twig.extendFilter('slug', function(value,params) {
    var slug = value.toLowerCase();
    slug = slug.split(' ');
    slug = slug.join('-');
    return slug;
});


app.set('views', __dirname + '/app/views');

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


//Lancement de l'application
app.listen('3000',() => {
   console.log('sever Listening on port 3000');
});
