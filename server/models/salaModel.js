const mongoose = require('mongoose');

const { Schema } = mongoose;

const salasModel = new Schema(
  {
    nombre: {type: String},
    descripcion: {type: String},
    idPelicula: {type: String},
    horario: {type: String}
  }
);

module.exports = mongoose.model('salas', salasModel);
