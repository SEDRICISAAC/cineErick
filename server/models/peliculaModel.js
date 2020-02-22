const mongoose = require('mongoose');

const { Schema } = mongoose;

const peliculasModel = new Schema(
  {
    foto: {type: String},
    titulo: {type: String},
    resumen: {type: String},
    categorias: {type: String},
    valorBoleto: {type: String}
  }
);

module.exports = mongoose.model('peliculas', peliculasModel);
