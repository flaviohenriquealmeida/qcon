angular.module('minhaApp')
	.controller('CadastroController', function($scope, recursoPalestrante, $routeParams, $location) {

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

			if(idPalestrante) {
				recursoPalestrante.update({id: idPalestrante}, $scope.palestrante, function(palestrante) {
					$location.path('/');
				});
			} else {
				recursoPalestrante.save($scope.palestrante, function() {
					$scope.palestrante = {};
				});
			}
		}
	});