angular.module('minhaApp')
	.controller('CadastroController', function($scope, recursoPalestrante) {

		$scope.palestrante = {};

		$scope.gravar = function() {

			recursoPalestrante.save($scope.palestrante, function() {
				$scope.palestrante = {};
			});
		};
	});