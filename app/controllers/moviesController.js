const express = require('express');
const router = express.Router();
const Movie = require('../models/movie').model;
const Categorie = require('../models/categorie').model;

//Listing des films
router.get('/',async (req,res) => {
    try {
        let movies = await Movie.find().populate('categorie');
        res.render('movies/page/list.twig',{
            'movies': movies
        });

    } catch (e) {
        console.log('erreur :' + err.message);
    }
});

//Formulaire d'ajout film
router.get('/form',async (req,res) => {
    try {
        let categories = await Categorie.find({});

        res.render('movies/form/add.twig', {
            categories: categories
        });
    } catch (e) {
        res.redirect('/');
    }
});

//Traitement du formulaire d'ajout
router.post('/form',(req,res) => {
   if (req.body) {
       var movie = new Movie({
           title: req.body.title,
           synopsis: req.body.synopsis,
           image: req.body.image,
           year: req.body.year,
           rate: req.body.rate,
           categorie: req.body.cat
       });
       movie.save((err,movie) => {
            if (err) {
                console.log('/');
            } else {
                res.redirect('/');
            }
       });
   }
});

//Formulaire d'edition
router.get('/:id/edit',async (req,res) => {
    var id = req.params.id;
    try {
        let movie = await Movie.findById(id).populate('categorie');
        try {
            let categories = await Categorie.find({});
            res.render('movies/form/edit.twig', {
                'movie': movie,
                'categories': categories
            });
        } catch (e) {
            res.redirect('/');
        }
    } catch (e) {
        res.redirect('/');
    }
});

//Traitement formulaire d'edition
router.post('/:id/edit',(req,res) => {
    var id = req.params.id;

    Movie.findByIdAndUpdate(id,{$set: {
                title: req.body.title,
                synopsis: req.body.synopsis,
                image: req.body.image,
                year: req.body.year,
                rate: req.body.rate,
                categorie: req.body.cat,
            }},{}).then((movie) => {

                res.redirect('/');

            }).catch(() => {

                console.log(err);
                res.redirect('/');

            });
});

//Suppression
router.delete('/:id/delete',(req,res) => {
    var id  = req.params.id;
    Movie.findByIdAndRemove(id,{}, (err,success) => {
        if (err) {
            res.status(500);
        } else {
            res.status(200);
        }
        res.send();
    });
});

//Vue unique d'un film
router.get('/:id',async (req,res) => {
    var id = req.params.id;
    try {
        let movie = await Movie.findById(id).populate('categorie');
        res.render('movies/page/single.twig',{
            'movie': movie
        });
    } catch (e) {
        res.redirect('/');
    }
});

module.exports = router;