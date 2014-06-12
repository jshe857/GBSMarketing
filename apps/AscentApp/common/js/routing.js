var ascent = angular.module('Ascent', [ 'ionic' ]).config(
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
					}).state('industry.filter', {
						url:'/industry/:id',
						templateUrl : 'templates/preview.html',
						controller : function($stateParams) {
							console.log($stateParams.id);
						}
					}).state('preview', {
						url : '/preview',
						templateUrl : 'templates/preview.html',
						controller : 'PreviewCtrl'
					}).state('cloud', {
						url : '/cloud',
						templateUrl : 'templates/preview.html',
						controller : 'CCtrl'
					}).state('analytics', {
						url : '/analytics',
						templateUrl : 'templates/preview.html',
						controller : 'ACtrl'
					}).state('mobile', {
						url : '/mobile',
						templateUrl : 'templates/preview.html',
						controller : 'MCtrl'
					}).state('social', {
						url : '/social',
						templateUrl : 'templates/preview.html',
						controller : 'SCtrl'
					});
					$urlRouterProvider.otherwise('/start');
				} ]);