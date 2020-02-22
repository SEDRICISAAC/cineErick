const mongoose = require('mongoose');

const { Schema } = mongoose;

const pedidosModel = new Schema(
  {
    nombre: {type: String},
    descripcion: {type: String},
    idPelicula: {type: String},
    horario: {type: String}
  }
);

module.exports = mongoose.model('pedidos', pedidosModel);
