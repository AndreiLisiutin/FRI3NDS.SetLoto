'use strict';

angular.module('loto.controllers')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			$stateProvider
				.state('loto.navigation.cardsSelection', {
					url: '/cards-selection',
					templateUrl: 'app/components/cards-selection/cards-selection.html',
					controller: 'CardsSelectionController'
				});
		}
	])
	.controller('CardsSelectionController', [
		'$scope', '$state', '$timeout',
		function ($scope, $state, $timeout) {

		}
	]);