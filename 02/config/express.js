var express = require('express');
var app = express()
	,load = require('express-load');

// configurações de middlewares
app.use(express.static('public'));

// aqui entra configuração do express-load

module.exports = app;






