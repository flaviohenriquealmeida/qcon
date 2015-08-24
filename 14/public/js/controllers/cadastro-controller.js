angular.module('minhaApp')
	.controller('CadastroController', function($scope, recursoPalestrante, $routeParams, $location, servicoPalestrante) {

		$scope.palestrante = {};

		var idPalestrante = $routeParams.id;
		
		if(idPalestrante) {
			recursoPalestrante.get({id: idPalestrante}, function(palestrante) {
				$scope.palestrante = palestrante;
			}, function(erro) {
				console.log(erro);
			});
		}

		$scope.gravar = function() {

			servicoPalestrante
				.cadastrar($scope.palestrante)
				.then(function(retorno) {
					if (retorno.alteracao) $location.path('/');
					$scope.palestrante = {};				
				})
				.catch(function(erro) {
					console.log(erro.msg);
				});	
		}
	});