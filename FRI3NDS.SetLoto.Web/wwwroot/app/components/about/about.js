'use strict';

angular.module('loto.controllers')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			$stateProvider
				.state('loto.about', {
					url: '/about',
					templateUrl: 'app/components/about/about.html',
					controller: 'AboutController'
				});
		}
	])
	.controller('AboutController', [
		'$scope', '$state', '$timeout',
		function ($scope, $state, $timeout) {

		}
	]);