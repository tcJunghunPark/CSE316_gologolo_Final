var mongoose = require('mongoose');

var logoModel = new mongoose.Schema({
  id: String,
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 1, max: 50},
  borderWidth: { type: Number, min: 1, max: 50},
  borderStyle : {type : String, default : "solid"},
  margin: { type : Number, min: 1, max: 50},
  height : { type : Number, min : 100, max : 1000 },
  width : { type : Number, min : 100, max : 1000 },
  border : { type : String, default : "solid"},
  position : {type : String, default : "absolute"},
  textBoxFontColor : {type : String, default : "black"},
  textBoxFontSize : {type : Number, default : 16},
  
  textBoxCounter : { type : Number, min: 0},
  imageCounter : { type : Number, min: 0},
  bugCounter : { type : Number, min : 0},

  textBoxList : [{ 
    __typename : String,
    name : String, 
    text : { type : String, default : "Example Text"}, 
    color : { type : String, default : "#000000"}, 
    fontSize : { type : String, default : "16px"}, 
    background : { type : String, default : "transparent"}, 
    border : { type : String, default : "none"},
    corX : { type : Number}, 
    corY : { type : Number}
  }],

  imageList : [{ 
    __typename : String,
    name : String, 
    source : String, 
    width : { type : Number, min: 10}, 
    height : { type : Number, min: 10}, 
    corX : { type : Number}, 
    corY : { type : Number}, 
  }],

  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('logoCanvas', logoModel);