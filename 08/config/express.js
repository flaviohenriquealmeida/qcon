var express = require('express');
var app = express()
	,load = require('express-load')
	,bodyParser = require('body-parser');

// configurações de middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

load('models', {cwd: 'app'})
    .then('api')
    .into(app);

module.exports = app;






