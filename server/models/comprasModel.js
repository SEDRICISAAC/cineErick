const mongoose = require('mongoose');

const { Schema } = mongoose;

const comprasModel = new Schema(
  {
    totalBoletos: {type: String},
    email: {type: String},
    sala: {type: String},
    pelicula: {type: String},
    horario: {type: String}
  }
);

module.exports = mongoose.model('compras', comprasModel);

