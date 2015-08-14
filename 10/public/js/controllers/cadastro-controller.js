angular.module('minhaApp')
	.controller('CadastroController', function($scope, $resource) {

		var recursoPalestrante = $resource('/palestrantes');
		$scope.palestrante = {};

		$scope.gravar = function() {
			
			recursoPalestrante.save($scope.palestrante, function() {
				$scope.palestrante = {};
			});
		}
	});