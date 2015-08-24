module.exports = function(app) {

	var api = app.api.palestrantes
	
	app.route('/palestrantes')
		.get(api.lista)
		.post(api.adiciona);

	app.route('/palestrantes/:id')
		.delete(api.deleta)
		.get(api.buscaPorId)
		.put(api.altera);
};

