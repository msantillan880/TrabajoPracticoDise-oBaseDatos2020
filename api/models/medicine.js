const mongoose = require('mongoose')

var Schema = mongoose.Schema;


var medicamentos = new Schema({
    _id: String,
    diagnostico: String,
    medicinaArray: [String]
})
module.exports = mongoose.model('medicamentos', medicamentos);
