var express = require('express');
var app = express()
	,load = require('express-load');

// configurações de middlewares
app.use(express.static('public'));

load('models', {cwd: 'app'})
    .then('api')
    .into(app);

module.exports = app;






