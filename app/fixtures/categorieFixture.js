const categorie = require('../models/categorie');
const EventEmitter = require('events');
const categorieEmitter = new EventEmitter();

async function fixtures() {
    return new Promise(async (resolve,reject) => {
        try {
            await categorie.model.remove({});

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
            datas.forEach(async (data) => {
                const Categorie = new categorie.model({
                    name: data
                });
                try {
                    let categorie = await Categorie.save();
                    i++;
                    if (i == (datas.length - 1)) {
                        resolve();
                    }
                } catch (e) {
                    reject();
                }
            });
        } catch(e) {
            reject();
        }
    });
}

fixtures().then(() => {
    categorieEmitter.emit('done');
}).catch(() => {
    categorieEmitter.emit('error');
});

module.exports = categorieEmitter;