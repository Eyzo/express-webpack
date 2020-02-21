//Importation des dépendances
const app = require('./app/conf/app');
const db = require('./app/conf/connection');

db.on('error', () => {
    console.error.bind(console, 'connection error:');
});

db.on('open',() => {
    console.log('vous êtes connecté');
});

//Lancement de l'application
app.listen('3000',() => {
   console.log('sever Listening on port 3000');
});
