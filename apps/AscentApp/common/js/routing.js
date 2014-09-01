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
					}).state('nav.category', {
						url : '/category?searchKey&title&theme',
						views : {
							'menuContent' : {
								templateUrl : 'templates/preview.html',
								controller : 'PreviewCtrl'
							}
						},
						abstract:true
					}).state('nav.category.introduction', {
						url : '/introduction',
						views: {
							'previewContent': {
								templateUrl : 'templates/introduction.html'
							}
						}
					}).state('nav.category.journeys', {
						url : '/journeys',
						views: {
							'previewContent': {
								templateUrl : 'templates/journeys.html'
							}
						}	
					}).state('nav.category.perspectives', {
						url : '/perspectives',
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
					}).state('nav.search', {
						url: '/search',
						views : {
							'menuContent' : {
								templateUrl : 'templates/search.html',
								controller : 'SearchCtrl'
							}
						}
					});
					$urlRouterProvider.otherwise('/nav/start');
				} ]);