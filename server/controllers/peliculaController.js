const express = require('express');
const mongoose = require('mongoose');
const Pelicula = require('../models/peliculaModel')
const routerApi = express.Router();
const db = mongoose.connect('mongodb://localhost/Cine');
const base644 = require('base64-arraybuffer');


routerApi.route('/getMovieId')
  .get((req,res) => {
    let idBase64 = req.query.id;
    let buff = str => JSON.parse(new Buffer(str,'base64').toString('utf-8'));
    let id = buff(idBase64)

    let dataTemporal = [];

    Pelicula.find({"_id": id}, (err,resp) => {
      if(err){
        return res.send(err)
      }
          return res.json(resp)
    });
  });

routerApi.route('/getMovie')
  .get((req,res) => {
    Pelicula.find((err,resp) => {
      if(err){
        console.log('emntro ¡')
        return res.send(err)
      }
      return res.json(resp)
    })
  })

routerApi.route('/newMovie')
  .post((req, res) => {
    let pelicula = new Pelicula(req.body)

    pelicula.save((err,resp) => {
      if(err){
        return res.json(err);
      }
      return res.json(resp);
    })
  });

  routerApi.route('/updateMovie')
  .put((req, res) => {

    let pelicula = req.body

    Pelicula.updateOne({'_id': pelicula._id}, pelicula , (err,resp) => {
      if(err){
        return res.json(err);
      }

      return res.json(resp);
    })
  });

  routerApi.route('/deleteMovie')
  .delete((req, res) => {
    let id = req.body.id

    Pelicula.deleteOne( {'_id': id},(err,resp) => {
      if(err){
        return res.json(err);
      }
      return res.json(resp);
    })
  });


module.exports = routerApi;
