const mongoose = require('mongoose');
const db = require('../conf/connection');
const categorieEmitter = require('./categorieFixture');
require('events').EventEmitter.defaultMaxListeners = 0;

db.on('open',() => {

    categorieEmitter.once('done',function () {
        console.log('categories bien inséré en base');
        const movieEmitter = require ('./movieFixture');

        movieEmitter.once('done',function () {
            console.log('films bien inséré en base');
            mongoose.connection.close();
        });

        movieEmitter.once('error', function () {
            console.log(`il y a eu une erreur dans l'insertion en base des films`);
        });

    });

    categorieEmitter.once('error', function () {
        console.log(`il y a eu une erreur dans l'insertion en base des categories`);
    });

});
