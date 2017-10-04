'use strict';

angular.module('loto.controllers')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			$stateProvider
				.state('loto.navigation', {
					abstract: true,
					templateUrl: 'app/components/navigation/navigation.html',
					controller: 'NavigationController'
				});
		}
	])
	.controller('NavigationController', [
		'$scope', '$state', '$timeout',
		function ($scope, $state, $timeout) {

		}
	]);