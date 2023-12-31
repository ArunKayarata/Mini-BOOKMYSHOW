const mongoose = require("mongoose");
const movieschema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  
  },
  genre: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
 
  releaseDate: {
    type: Date,
    required: true

  },
  poster:{
    type:String,
    required: true
 
  },
  duration:{
    type:Number,
    required: true
  }
});
module.exports = mongoose.model("Movies", movieschema);
