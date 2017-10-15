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
		'$scope', '$state', '$timeout', 'TicketService',
		function ($scope, $state, $timeout, TicketService) {

			$scope.ticketPhoto = {
				filesize: null,
				filetype: null,
				filename: null,
				base64: null
			};
			$scope.ticketsSets = {};

			$scope.recognizeNumbers = recognizeNumbers;
			$scope.addTicketsSet = function() {
				var existingKeys = Object.keys($scope.ticketsSets).map(function(k) {
					return parseInt(k);
				});
				var newKey = Math.max.apply(null, existingKeys) + 1;

				$scope.ticketsSets[newKey.toString()] = [];
			};
			$scope.addTicket = function(ticketsSetNumber, ticket) {
				$scope.ticketsSets[ticketsSetNumber.toString()].push(ticket);
			};

			$scope.addTicketsSet();
			//////////////////////////////////////

			function recognizeNumbers() {
				TicketService.recognizeNumbers({
					imageBase64: $scope.ticketPhoto.base64
				}).$promise
					.then(function (data) {
						$scope.addTicket(data);
					})
					.catch(function (error) {
						toastr.error(error && error.data && error.data.message, 'Ошибка');
					});
			}
		}
	]);