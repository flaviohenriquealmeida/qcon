var palestrantes = [
	{"nome": "Flávio Almeida"},
	{"nome" : "Zeca Baleiro"},
	{"nome" : "Tião Galinha"},
];

module.exports = function(app) {
	
	app.route('/palestrantes')
		.get(function(req, res) {
			res.json(palestrantes);
		});
};