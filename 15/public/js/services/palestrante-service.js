angular.module('meusServicos', ['ngResource'])
	.factory('recursoPalestrante', function($resource) {

		return $resource('palestrantes/:id', null, 
		{
            'update' : { 
                method: 'PUT'
            }
        });
	})
	.factory('servicoPalestrante', function(recursoPalestrante, $q) {

		var servico = {};

		servico.cadastrar = function(palestrante) {


			return $q(function(resolve, reject) {

				if(palestrante._id) {
					recursoPalestrante.update({id: palestrante._id}, palestrante, function() {
						resolve({ msg: 'Alterado com sucesso', alteracao: true});
					}, function(erro) {
						console.log(erro);
						reject({ msg: 'Não foi possível alterar'});
					});

				} else {
					recursoPalestrante.save(palestrante, function() {
						resolve({ msg: 'Incluído com sucesso', alteracao: false});
					}, function(erro) {
						console.log(erro);
						reject({ msg: 'Não foi possível incluir'});
					});
				}
			});
		};

		return servico;
	});	