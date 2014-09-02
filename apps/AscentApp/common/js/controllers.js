ascent.controller(
		'MainCtrl',
		function($scope, $http, DBService, SearchStore, FavouriteService, $window, $sce,
				$ionicSideMenuDelegate,$state) {
			//load global services
			$http.get("data/data.json").success(function(data) {
				var db = new DBService();
				db.insertData(data);
				$scope.db = db;
			});
			$scope.favourites = FavouriteService;
			console.log($scope.favourites);
			//utility side menu functions
			$scope.getSideMenuSize = function() {
				return $window.screen.width / 3;
			};

			$scope.focusMenu = function() {
				return $ionicSideMenuDelegate.isOpen();
			};
			$scope.toggleRight = function() {
				$ionicSideMenuDelegate.toggleRight();
			};
			
			//utility navigation functions
			$scope.search = function(buttonText) {
				SearchStore.search(buttonText);
			};
			$scope.searchstore = SearchStore;
			$scope.getDetails = function(row) {
				$state.go('nav.details', {
					media : JSON.stringify(row)
				});
			};
			
			//utility resource functions
			$scope.getImage = function(id) {
				return 'http://img.youtube.com/vi/' + id + '/0.jpg';
			};
			$scope.getUrl = function(id) {
				return $sce.trustAsResourceUrl('http://www.youtube.com/embed/'
						+ id);
			};
			$scope.getThumbnail = function(id) {
				//return 'http://img.youtube.com/vi/' + id + '/1.jpg';
				return 'media/' + id + '/logo.png';
			}

		}).controller('StartCtrl', function($scope, $state) {

}).controller('PreviewCtrl',
		function($scope, $state, $stateParams, $window, $rootScope) {
			$scope.db.queryKey($stateParams.searchKey);
			$scope.title = $stateParams.title;
			$scope.style = {
					theme: $stateParams.theme
			};
			$scope.state=$state;
}).controller('DetailsCtrl', function($scope, $stateParams, $http,$ionicPopup,$window) {
	$scope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
		var state = from.name.split('.');
		var name = state[state.length-1];
		$scope.prevState = name.charAt(0).toUpperCase() + name.slice(1);
	});
	$scope.back = function() {
		$window.history.back();
	};
	$scope.media = angular.fromJson($stateParams.media);
	
	$http.get("media/" + $scope.media.id + "/main.txt").success(function(data) {
		$scope.media.body = data;
	});
	
	$scope.setBackground = function() {
		var url = "media/" + $scope.media.id + "/body.png";
		return {
			'background-image' : 'url("' + url + '")'
		};
	};
	$scope.favouritesPopup =function() {
		var result = $ionicPopup.confirm({
			title: 'Favourites',
			template: 'Would you like to add this article to your favourites page?'
		});
		result.then(function() {
			if (result) {
				$scope.favourites.add($scope.media);
			}
		});
	};
}).controller('FormCtrl', function($scope, EmailService) {
	$scope.client = {};
	$scope.send = function(client) {
		EmailService.send(client);
	};
}).controller('SearchCtrl', function($scope,$rootScope) {
	$scope.db.queryAll();
}).controller('FavouritesCtrl', function($scope) {
	$scope.list = $scope.favourites;
});
