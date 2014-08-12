var ascent = angular.module('Ascent', [ 'ionic' ]).config(
		[ '$stateProvider', '$urlRouterProvider',
				function($stateProvider, $urlRouterProvider) {

					$stateProvider.state('nav', {
						url : '/nav',
						abstract : true,
						templateUrl : 'templates/navmenu.html'
					}).state('nav.start', {
						url : '/start',
						views : {
							'menuContent' : {
								templateUrl : 'templates/start.html',
								controller : 'StartCtrl'
							}
						}
					}).state('nav.cams', {
						url : '/cams',
						views : {
							'menuContent' : {
								templateUrl : 'templates/select.html',
								controller : 'CAMSCtrl'
							}
						}
					}).state('nav.industry', {
						url : '/industry',
						views : {
							'menuContent' : {
								templateUrl : 'templates/select.html',
								controller : 'IndustryCtrl'
							}
						}
					}).state('nav.search', {
						url : '/search?searchKey&title&theme',
						views : {
							'menuContent' : {
								templateUrl : 'templates/preview.html',
								controller : 'PreviewCtrl'
							}
						}
					}).state('nav.details', {
						url : '/details?media',
						views : {
							'menuContent' : {
								templateUrl : 'templates/details.html',
								controller : 'DetailsCtrl'
							}
						}
					});
					$urlRouterProvider.otherwise('/nav/start');
				} ]);