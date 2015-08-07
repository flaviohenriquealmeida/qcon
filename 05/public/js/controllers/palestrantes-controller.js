angular
	.module('minhaApp')
	.controller('PalestrantesController', function($scope) {
		$scope.palestrantes = [
			{"nome": "Flávio Almeida", "palestra" : "MEAN"},
			{"nome" : "Zeca Baleiro",  "palestra" : "Angular"},
			{"nome" : "Tião Galinha",  "palestra" : "Mongo"}
		];
	});