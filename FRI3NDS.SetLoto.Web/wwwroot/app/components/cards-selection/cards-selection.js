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
		'$scope', '$state', '$timeout', 'CardService', '$http',
		function ($scope, $state, $timeout, CardService, $http) {

			$scope.newCardPhoto = createNewCardPhoto();
			$scope.cardsSets = [];

			$scope.recognizeNumbers = recognizeNumbers;

			$scope.addCardsSet = function () {
				var cardsSet = {
					id: generteGuid(),
					cards: []
				};
				$scope.cardsSets.push(cardsSet);

				scrollCardsSetsToTheEnd();
				return cardsSet;
			};

			$scope.addCard = function (cardsSet, file) {
				var fd = new FormData();
				fd.append('uploads', file);
				$http({
					method: 'POST',
					url: '/api/Card/RecognizeNumbers',
					data: fd,
					// transformRequest: function (data, headersGetter) {
					// 	var formData = new FormData();
					// 	angular.forEach(data, function (value, key) {
					// 		formData.append(key, value);
					// 	});
					// 	return formData;
					// }
				})
					.success(function (data) {

					})
					.error(function (data, status) {

					});


				// CardService.recognizeNumbers({
				// 	imageBase64: $scope.newCardPhoto.base64
				// }).$promise
				// 	.then(function (data) {
				// 		cardsSet.cards.push(data);
				// 		debugger;
				// 		createNewCardPhoto();
				// 	})
				// 	.catch(function (error) {
				// 		alert(error && error.data && error.data.message);
				// 	});

			};

			//Set options for dropzone
			//Visit http://www.dropzonejs.com/#configuration-options for more options
			$scope.dzOptions = {
				url: 'fake',
				paramName: 'fake',
				uploadMultiple: false,
				maxFiles: 1,
				init: function () {
					this.on("maxfilesexceeded", function (file) {
						this.removeAllFiles();
						this.addFile(file);
					});
				},
				clickable: true,
				acceptedFiles: 'image/jpeg, images/jpg, image/png',
				addRemoveLinks: true
			};


			//Handle events for dropzone
			//Visit http://www.dropzonejs.com/#events for more events
			$scope.dzCallbacks = {
				'addedfile': function (file) {
					console.log(file);
					$scope.addCard(null, file);
				},
				'success': function (file, xhr) {
					console.log(file, xhr);
				}
			};


			//Apply methods for dropzone
			//Visit http://www.dropzonejs.com/#dropzone-methods for more methods
			$scope.dzMethods = {};
			$scope.removeNewFile = function () {
				$scope.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
			};

			var card = {
				"cardLines": {
					"0": {"numbers": {"0": 79, "1": 18, "2": 66, "3": 67, "4": 22}},
					"1": {"numbers": {"0": 35, "1": 72, "2": 26, "3": 74, "4": 33}},
					"2": {"numbers": {"0": 3, "1": 23, "2": 32, "3": 87, "4": 31}},
					"3": {"numbers": {"0": 75, "1": 34, "2": 61, "3": 7, "4": 7}},
					"4": {"numbers": {"0": 46, "1": 3, "2": 87, "3": 11, "4": 4}},
					"5": {"numbers": {"0": 37, "1": 39, "2": 51, "3": 39, "4": 13}}
				}
			};
			var initialSet = $scope.addCardsSet();
			initialSet.cards.push(card);

			//////////////////////////////////////

			function createNewCardPhoto() {
				$('#newCardPhoto').val('');
				return {
					filesize: null,
					filetype: null,
					filename: null,
					base64: null
				};
			}

			function scrollCardsSetsToTheEnd() {
				var scrollingFunction = function () {
					var element = $(".cards-sets-container");
					var totalWidth = 0;
					element.find('.cards-set').each(function (index) {
						totalWidth += parseInt($(this).width(), 10);
					});

					element.animate({scrollLeft: totalWidth}, 1000);
				};

				$timeout(scrollingFunction, 10);
			}

			function generteGuid() {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
					var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
			}

			function recognizeNumbers() {
				CardService.recognizeNumbers({
					imageBase64: $scope.CardPhoto.base64
				}).$promise
					.then(function (data) {
						$scope.addCard(data);
					})
					.catch(function (error) {
						toastr.error(error && error.data && error.data.message, 'Ошибка');
					});
			}
		}
	]);