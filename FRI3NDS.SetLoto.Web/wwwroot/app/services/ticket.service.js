(function () {
	'use strict';

	angular
		.module('loto.services')
		.factory('TicketService', ['$resource', function ($resource) {
			return $resource('/api/Ticket/:id', null, {
				recognizeNumbers: {
					url: '/api/Ticket/RecognizeNumbers',
					method: 'POST',
					isArray: false
				}
			});
		}]);
})();

