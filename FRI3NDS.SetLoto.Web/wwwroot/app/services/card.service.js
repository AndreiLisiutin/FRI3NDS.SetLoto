(function () {
	'use strict';

	angular
		.module('loto.services')
		.factory('CardService', ['$resource', function ($resource) {
			return $resource('/api/Card/:id', null, {
				recognizeNumbers: {
					url: '/api/Card/RecognizeNumbers',
					method: 'POST',
					isArray: false
				}
			});
		}]);
})();

