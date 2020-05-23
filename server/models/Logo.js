var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  texts: Array,
  imgURLs: Array,
  
  backgroundColor: String,
  borderColor: String,
  borderRadius:{type: Number, min : 0, max : 50},
  borderThickness: {type: Number, min:0, max: 144},
  padding: {type: Number, min:0, max: 144},
  margin: {type: Number, min: 0, max: 100},
  sizeX: {type: Number, min: 0, max: 100},
  sizeY: {type: Number, min: 0, max: 100},
  lastUpdate: { type: Date, default: Date.now },
});




module.exports = mongoose.model('Logo', LogoSchema);
