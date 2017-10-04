'use strict';

angular.module('loto.extensions', [
	'uiRouterStyles',
	'ngSanitize',
	'ui.router',
	'ngAnimate',
	'naif.base64',
	'toastr'
]);
angular.module('loto.services', [
	'ngResource'
]);
angular.module('loto.controllers', ['loto.extensions', 'loto.services']);

angular.module('lotoApp', ['loto.controllers', 'loto.extensions', 'loto.services'])
	.run(['$rootScope',
		function ($rootScope) {
			$rootScope.$on('$viewContentLoaded', function () {
				$('html, body').animate({scrollTop: 0}, 200);
			});
		}
	])
	.config([
		'$stateProvider', '$locationProvider', '$urlRouterProvider',
		function ($stateProvider, $locationProvider, $urlRouterProvider) {
			// для маршрутов со слешом
			$locationProvider.hashPrefix('');

			// маршрут по умолчанию.
			$urlRouterProvider.otherwise('/about');

			//базовый путь маршрутов приложения
			$stateProvider
				.state('loto',
					{
						url: '^',
						abstract: true,
						templateUrl: 'app/components/_layout/main.html'
					});
		}
	])
	.config([
		'$httpProvider',
		function ($httpProvider) {
			/**
			 * Приведение к camelCase объекта рекурсивно.
			 * @param data объект.
			 * @returns {*}
			 */
			function toCamelCase(data) {
				if (!data) {
					return data;
				}
				var camelCaseObject = {};
				_.forEach(
					data,
					function (value, key) {
						if (_.isPlainObject(value) || _.isArray(value)) {
							value = toCamelCase(value);
						}
						camelCaseObject[_.camelCase(key)] = value;
					}
				);
				return camelCaseObject;
			}

			$httpProvider.interceptors.push([
				'$rootScope', '$q', '$window', '$timeout',
				function ($rootScope, $q, $window, $timeout) {
					return {
						'response': function (response) {
							return toCamelCase(response);
						},

						'responseError': function (rejection) {
							return $q.reject(toCamelCase(rejection));
						}
					};
				}
			]);
		}
	])
	.config([
		'$httpProvider',
		function ($httpProvider) {
			//конфигурация загрузчика
			var requests = 0;
			var timer = false;
			var nprogressThreshold = 10; // сколько мс подождать перед показом ползунка
			var progressSelector = 'body';//'#progress';
			NProgress.configure({
				parent: progressSelector,
				showSpinner: false
			});

			$httpProvider.interceptors.push([
				'$rootScope', '$q', '$window', '$timeout',
				function ($rootScope, $q, $window, $timeout) {
					return {
						'request': function (config) {
							if (requests == 0) {
								timer = $timeout(function () {
									if ($(progressSelector)[0]) {
										NProgress.start();
									}
								}, nprogressThreshold);
								$rootScope.loading = true;
							}
							requests++;
							return config || $q.when(config);
						},

						'response': function (config) {
							if (--requests == 0) {
								$timeout.cancel(timer);
								if ($(progressSelector)[0]) {
									NProgress.done();
								}
								$rootScope.loading = false;
							}
							return config || $q.when(config);
						},

						'responseError': function (rejection) {
							if (--requests == 0) {
								$timeout.cancel(timer);
								if ($(progressSelector)[0]) {
									NProgress.done();
								}
								$rootScope.loading = false;
							}
							return $q.reject(rejection);
						}
					};
				}
			]);
		}
	]);