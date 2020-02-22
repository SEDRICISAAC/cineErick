const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const rutas = require('./controllers/authController');
const rutasPelicula = require('./controllers/peliculaController');
const rutasSalas = require('./controllers/salaController');
const rutasCompras = require('./controllers/comprasController');
const cors = require('cors');

app.use(bodyParser.json({ limit: '500mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));

app.use(cors())

app.use('/server',rutas);
app.use('/server',rutasPelicula);
app.use('/server',rutasSalas);
app.use('/server',rutasCompras);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
})
