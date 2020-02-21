const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
    name: String
});

module.exports = {
    'model': mongoose.model('Categorie', categorieSchema),
    'schema': categorieSchema
};