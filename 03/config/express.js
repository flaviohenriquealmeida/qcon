var express = require('express');
var app = express()
	,load = require('express-load');

// configurações de middlewares
app.use(express.static('public'));

load('api', {cwd: 'app'}).into(app);

module.exports = app;






