var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: String,
  color: String,
  fontSize: { type: Number, min: 2, max: 144 },
  backgroundColor: String,
  borderColor: String,
  borderRadius:{type: Number, min : 0, max : 50},
  borderThickness: {type: Number, min:0, max: 144},
  padding: {type: Number, min:0, max: 144},
  margin: {type: Number, min: 0, max: 100},
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);