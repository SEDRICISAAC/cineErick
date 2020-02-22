const mongoose = require('mongoose');

const { Schema } = mongoose;

const personaModel = new Schema(
  {
    nombre: {type: String},
    correo: {type: String},
    clave: {type: String},
  }
);

module.exports = mongoose.model('personas', personaModel);