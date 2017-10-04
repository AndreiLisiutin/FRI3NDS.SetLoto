(function () {
	'use strict';

	angular
		.module('loto.services')
		.factory('TestService', ['$resource', function ($resource) {
			return $resource('/api/test/:id');
		}]);
})();

