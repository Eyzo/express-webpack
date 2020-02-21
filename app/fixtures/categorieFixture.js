const mongoose = require('mongoose');
const db = require('../conf/connection');
const categorie = require('../models/categorie');

db.on('error', () => {
   console.log('echec de la connection a la bdd');
});

db.on('open',() => {
    console.log('connection réussi avec succés !');

    categorie.model.remove({}).then(() => {
        new Promise((resolve,reject) => {
            const datas = [
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
            let i = 0;

            datas.forEach((data) => {
                const Categorie = new categorie.model({
                    name: data
                });
                Categorie.save().then((categorie) => {
                    i++;
                    console.log(`${categorie.name} crée avec succés`);
                    if (i == (datas.length - 1)) {
                        resolve();
                    }
                }).catch((err) => {
                    reject(err.message);
                });
            });
        }).then(() => {
            mongoose.connection.close();
        }).catch((err) => {
            console.log(err);
        });
    }).catch(() => {
        console.log('erreur lors de la suppresion des documents dans la collection categorie');
    });

});