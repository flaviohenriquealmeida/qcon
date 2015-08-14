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
		})
		.post(function(req, res) {
			Palestrante
			.create(req.body)
			.then(function(palestrante) {
				res.status(200).send(palestrante);
			});
		});

	app.route('/palestrantes/:id')
		.delete(function(req, res) {
			var id = req.params.id;
			Palestrante.remove({"_id" : id}).exec()
			.then(
			function() {
				 res.status(204).end();	
			}, 
			function(err) {
				return console.error(erro);
			});
		});
};

