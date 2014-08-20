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
							},
							'previewContent' : {
								templateUrl : 'templates/references.html'
							}
							
						}
					}).state('nav.search.solutions', {
						views: {
							'previewContent': {
								templateUrl : 'templates/solutions.html'
							}
						}
					}).state('nav.search.expertise', {
						views: {
							'previewContent': {
								templateUrl : 'templates/expertise.html'
							}
						}	
					}).state('nav.search.references', {
						views: {
							'previewContent': {
								templateUrl : 'templates/references.html'
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