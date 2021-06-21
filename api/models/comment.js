const mongoose = require('mongoose')

var Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;
var Comments = new Schema({
    whoComment     : String
  , textBody      : String
  , dateComment      : Date
}  , { optimisticConcurrency: true, versionKey: 'version' });
module.exports = mongoose.model('Comment', Comments);