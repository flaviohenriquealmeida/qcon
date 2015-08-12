angular.module('minhaApp', ['ngResource', 'ngRoute'])
	.config(function($routeProvider) {

		$routeProvider.when('/', {
			controller: 'ListaController',
			templateUrl: 'partials/lista.html'
		});

		$routeProvider.when('/cadastro', {
			templateUrl: 'partials/cadastro.html'
		});

		$routeProvider.otherwise({redirectTo: '/'});
	});