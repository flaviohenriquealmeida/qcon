var mongoose = require('mongoose');

module.exports = function() {
  
  var schema = mongoose.Schema({
    nome: { 
      type: String, 
      required: true
    }, 
    palestra: {
      type: String, 
      required: true
    }
  });

  return mongoose.model('Palestrante', schema);
};