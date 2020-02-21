const mongoose = require('mongoose');

//Connection avec la bdd
mongoose.connect('mongodb+srv://Admin:berserk62155@cluster0-nddx4.mongodb.net/maBase?retryWrites=true&w=majority', { useUnifiedTopology: true ,useNewUrlParser: true });
const db = mongoose.connection;

module.exports = db;