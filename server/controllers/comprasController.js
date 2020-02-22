const express = require('express');
const mongoose = require('mongoose');
const Compra = require('../models/comprasModel');
const routerApi = express.Router();
const db = mongoose.connect('mongodb://localhost/Cine');
const nodemailer = require("nodemailer");

routerApi.route('/getTicket')
  .get((req,res) => {
    Compra.find((err,resp) => {
      if(err){
        return res.send(err)
      }
      return res.json(resp)
    })
  })

routerApi.route('/newTicket')
  .post((req, res) => {

    let email = req.body.email
    let compra = new Compra(req.body)
    let mensaje = `Hola, te confirmamos tu comprar de ${req.body.totalBoletos} boletos para la funcion de ${req.body.pelicula} en horario de ${req.body.horario}`;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'login',
            user: 'eam.llumiquinga@yavirac.edu.ec',
            pass: '4201925bscso'
        }
    });

    const mailOptions = {
        from: 'cine@yavirac.edu.ec',
        to: email,
        subject: `Yavirac's Films`,
        html: `<div><h1>YAVIRAC's Film</h1><br><p>${mensaje}</p></div>`
    };

    compra.save((err,resp) => {
      if(err){
        return res.json(err);
        }
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return res.json(`Error del servidor: ${ err }`)
            } 
            else {
                return res.json('Compra Realizada');
            }
        })
    })
  });

module.exports = routerApi;