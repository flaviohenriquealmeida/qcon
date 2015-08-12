angular
	.module('minhaApp')
	.controller('ListaController', function($scope) {
		$scope.palestrantes = [
			{"nome": "Flávio Almeida", "palestra" : "MEAN"},
			{"nome" : "Zeca Baleiro",  "palestra" : "Angular"},
			{"nome" : "Tião Galinha",  "palestra" : "Mongo"}
		];
	});