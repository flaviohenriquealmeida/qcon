angular.module('minhaApp')
	.controller('CadastroController', function($scope, $resource) {

		var recurso = $resource('/palestrantes');
		$scope.palestrante = new recurso();

		$scope.gravar = function() {

			$scope.palestrante.$save(function() {
				
				// limpa o formulário
				$scope.palestrante = new recurso();
			});
		}
	});