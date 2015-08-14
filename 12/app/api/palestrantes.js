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
		})
		.get(function(req, res) {

			var _id = req.params.id;
			Palestrante.findById(_id)
			.exec()
			.then(function(palestrante) {
				if (!palestrante) throw new Error("Palestrante não encontrado");
					res.json(palestrante) 		
				}, 
				function(erro) {
					console.log(erro);
					res.status(404).json(erro);
				});		
		})
		.put(function(req, res) {

			var id = req.params.id;
			var palestrante = req.body;

			console.log(id);
			console.log(palestrante);

			Palestrante.findByIdAndUpdate(id, palestrante)
				.exec()
				.then(function(palestrante) {
					res.json(palestrante);
				 }, 
				 function(erro) {
				 	console.error(erro);
				 		res.status(500).json(erro);
				 	 }
				 );
		});
};

