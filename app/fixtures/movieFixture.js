const mongoose = require('mongoose');
const db = require('../conf/connection');
const movie = require('../models/movie');
const faker = require('faker/locale/fr');

db.on('error', () => {
    console.log('echec de la connection a la bdd');
});

db.on('open',() => {
    console.log('connection réussi avec succés !');

    movie.model.remove({}).then(() => {
        new Promise((resolve,reject) => {
            for (let i = 0;i < 20; i++) {

                const categories = [
                    'action',
                    'aventure',
                    'comédie',
                    'horreur',
                    'science-fiction',
                    'thriller',
                    'drame',
                    'policier',
                    'romance'
                ];

                const Movie = new movie.model({
                    title: faker.name.title(),
                    synopsis: faker.lorem.sentence(),
                    image: faker.image.imageUrl(),
                    year: faker.date.past(),
                    rate: Math.floor(Math.random() * 5),
                    categorie: [
                        {
                            name: categories[Math.floor(Math.random() * categories.length)]
                        }
                    ]
                });

                Movie.save().then((movie) => {
                    console.log(`${movie.title} crée avec succés`);
                    if (i == 20) {
                        resolve();
                    }
                }).catch((err) => {
                    reject(err.message);
                });
            }

        }).then(() => {
            mongoose.connection.close();
        }).catch((err) => {
            console.log(err);
        });
    }).catch(() => {
        console.log('erreur lors de la suppresion des documents dans la collection categorie');
    });

});