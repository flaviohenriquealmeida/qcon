angular.module('meusServicos', ['ngResource'])
	.factory('recursoPalestrante', function($resource) {

		return $resource('/palestrantes/:id');
	});