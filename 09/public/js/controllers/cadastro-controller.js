angular.module('minhaApp')
	.controller('CadastroController', function($scope, $resource) {

		var recursoPalestrante = $resource('/palestrantes');
		$scope.palestrante = new recursoPalestrante();

		$scope.gravar = function() {

			$scope.palestrante.$save(function() {
				
				// limpa o formulário
				$scope.palestrante = new recursoPalestrante();
			});
		}
	});