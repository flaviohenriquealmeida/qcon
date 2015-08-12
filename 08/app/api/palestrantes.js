module.exports = function(app) {
	
	var Palestrante = app.models.palestrante;
	
	app.route('/palestrantes')
		.get(function(req, res) {
			Palestrante
				.find()
				.exec()
				.then(function(palestrantes) {
					res.json(palestrantes);		
				});
		});
};