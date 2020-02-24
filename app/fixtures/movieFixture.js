const movie = require('../models/movie');
const categorie = require('../models/categorie');
const faker = require('faker/locale/fr');
const EventEmitter = require('events');
const movieEmitter = new EventEmitter();

async function fixtures() {
    return new Promise(async (resolve,reject) => {
        try {
            await movie.model.remove({});

            for (let i = 0; i < 20; i++) {
                try {
                    let cats = await categorie.model.find({});
                    let catId = cats[Math.floor(Math.random() * cats.length)]._id;

                    const Movie = new movie.model({
                        title: faker.name.title(),
                        synopsis: faker.lorem.sentences(15),
                        image: faker.random.image(),
                        year: faker.date.past(),
                        rate: Math.floor(Math.random() * 5),
                        categorie: catId
                    });

                    try {
                        let movie = await Movie.save();
                        if (i == 19) {
                            resolve();
                        }
                    } catch (e) {
                        reject();
                    }
                } catch (e) {
                    reject();
                }
            }
        } catch (e) {
            reject();
        }
    });
}

fixtures().then(() => {
    movieEmitter.emit('done');
}).catch(() => {

    movieEmitter.emit('error');
});

module.exports = movieEmitter;