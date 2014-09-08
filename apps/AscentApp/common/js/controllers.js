ascent
		.controller(
				'MainCtrl',
				function($scope, SearchHandler, $window,
						$ionicSideMenuDelegate, $state) {

					$scope.focusMenu = function() {
						return $ionicSideMenuDelegate.isOpen();
					};
					$scope.toggleRight = function() {
						$ionicSideMenuDelegate.toggleRight();
					};

					// utility navigation functions
					$scope.state = $state;
					$scope.pages = SearchHandler.pages;
					$scope.details = function(media) {
						SearchHandler.details(media);
					};

				}).controller('StartCtrl', function($scope, SearchHandler) {
			$scope.search = function(title) {
				SearchHandler.search(title);
			};
		}).controller('PreviewCtrl',
				function($scope, $stateParams, ContentFactory) {
					// read in style parameters for template
					$scope.page = {
						theme : $stateParams.theme,
						title : $stateParams.title
					};

					$scope.infographics = ContentFactory.infographics;
					$scope.testimonials = ContentFactory.testimonials;
					// define key to filter content
					$scope.key = {};
					$scope.key[$stateParams.title.toLowerCase()] = 1;

				}).controller(
				'DetailsCtrl',
				function($scope, $stateParams, $http, $window) {
					// header stuff
					$scope.$on('$stateChangeSuccess', function(ev, to,
							toParams, from, fromParams) {
						var state = from.name.split('.');
						var name = state[state.length - 1];
						$scope.prevState = name.charAt(0).toUpperCase()
								+ name.slice(1);
					});
					$scope.back = function() {
						$window.history.back();
					};

					// Load data
					$scope.media = angular.fromJson($stateParams.media);
					$scope.styleVideo=function() {
						if ($scope.media.bodyText) {
							return {'background-image' : 'url(' + $scope.media.previewUrl + ')'};
						}
					};
				}).controller('FormCtrl', function($scope, EmailService) {
			$scope.client = {};
			$scope.send = function(client) {
				EmailService.send(client);
			};
		}).controller('SearchCtrl', function($scope, ContentFactory) {
			$scope.testimonials = ContentFactory.testimonials;
			$scope.infographics = ContentFactory.infographics;
		}).controller('FavouritesCtrl', function($scope, ContentFactory) {
			$scope.favourites = ContentFactory.favourites;
		});
