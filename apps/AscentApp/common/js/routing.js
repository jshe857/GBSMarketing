var ascent = angular.module('Ascent', [ 'ionic']).config(
		[ '$stateProvider', '$urlRouterProvider',
				function($stateProvider, $urlRouterProvider) {
					$stateProvider.state('start', {
						url : '/start',
						templateUrl : 'templates/start.html',
						controller: 'StartCtrl'
					}).state('cams', {
						url : '/cams',
						templateUrl : 'templates/select.html',
						controller : 'CAMSCtrl'
					}).state('industry', {
						url : '/industry',
						templateUrl : 'templates/select.html',
						controller : 'IndustryCtrl'
					}).state('search', {
						url:'/search?searchKey&title',
						templateUrl : 'templates/preview.html',
						controller : 'PreviewCtrl'
					}).state('details', {
						url:'/details?mediaId',
						templateUrl : 'templates/details.html',
						controller : 'DetailsCtrl'
					});
					$urlRouterProvider.otherwise('/start');
				} ]);