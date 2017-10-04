'use strict';

angular.module('loto.controllers')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			$stateProvider
				.state('loto.navigation.userReview', {
					url: '/user-review',
					templateUrl: 'app/components/user-review/user-review.html',
					controller: 'UserReviewController'
				});
		}
	])
	.controller('UserReviewController', [
		'$scope', '$state', '$timeout',
		function ($scope, $state, $timeout) {

		}
	]);