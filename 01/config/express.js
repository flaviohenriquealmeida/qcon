var express = require('express');
var app = express();

// configurações de middlewares
app.use(express.static('public'));

module.exports = app;









