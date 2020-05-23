var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    id: String,
    URL: String,
    sizeX: {type: Number, min: 0, max: 100},
    sizeY: {type: Number, min: 0, max: 100},
    corX: {type: Number, min: 0, max: 100},
    corY: {type: Number, min: 0, max: 100},
    lastUpdate: { type: Date, default: Date.now },
  
  });

  
module.exports = mongoose.model('Image', ImageSchema);
