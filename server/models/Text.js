var mongoose = require('mongoose');


var TextSchema = new mongoose.Schema({
    id: String,
    color: String,
    fontSize: { type: Number, min: 2, max: 144 },
    corX: {type: Number, min: 0, max: 100},
    corY: {type: Number, min: 0, max: 100},
    lastUpdate: { type: Date, default: Date.now },
  
  });

  module.exports = mongoose.model('Texts', TextSchema);