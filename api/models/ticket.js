const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var Comments = require('./comment').schema;

var BlogPosts = new Schema({
      apyn     : String,
      nroAfiliado : String,
      diagnostico : String,
      idPrestador : String,
      prestacion  : String,
      fechaCreacion : Date,
      comments  : [Comments]           
    }  
    , { optimisticConcurrency: true, versionKey: 'version' });

    module.exports = mongoose.model('Ticket', BlogPosts);

