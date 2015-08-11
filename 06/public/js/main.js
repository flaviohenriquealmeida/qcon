angular.module('minhaApp', ['ngResource', 'ngRoute'])
	.config(function($routeProvider) {

		$routeProvider.when('/', {
			controller: 'PalestrantesController',
			templateUrl: 'partials/listagem.html'
		});

		$routeProvider.when('/cadastro', {
			templateUrl: 'partials/cadastro.html'
		});

		$routeProvider.otherwise({redirectTo: '/'});
	});