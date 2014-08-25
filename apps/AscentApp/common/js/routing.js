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
					}).state('nav.search', {
						url : '/search?searchKey&title&theme',
						views : {
							'menuContent' : {
								templateUrl : 'templates/preview.html',
								controller : 'PreviewCtrl'
							}
						}
					}).state('nav.search.introduction', {
						views: {
							'previewContent': {
								templateUrl : 'templates/introduction.html'
							}
						}
					}).state('nav.search.journeys', {
						views: {
							'previewContent': {
								templateUrl : 'templates/journeys.html'
							}
						}	
					}).state('nav.search.perspectives', {
						views: {
							'previewContent': {
								templateUrl : 'templates/perspectives.html'
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