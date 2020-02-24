const mongoose = require('mongoose');
const categorie = require('../models/categorie');

const movieSchema = mongoose.Schema({
    title: String,
    synopsis: String,
    image: String,
    year: Number,
    rate: Number,
    categorie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categorie'
        }
});

module.exports = {
    'model': mongoose.model('Movie', movieSchema),
    'schema': movieSchema
};