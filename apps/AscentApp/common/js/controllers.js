ascent.controller(
		'MainCtrl',
		function($scope, $http, DBService, SearchStore, $window, $sce,
				$ionicModal, $ionicSideMenuDelegate,$state) {
			$http.get("insert.json").success(function(data) {
				var db = new DBService();
				db.insertData(data);
				$scope.db = db;
			});
			$scope.getSideMenuSize = function() {
				return $window.screen.width / 3;
			};
			$ionicModal.fromTemplateUrl('templates/dataform.html', function(
					modal) {
				$scope.modal = modal;
			}, {
				animation : 'slide-in-up',
				focusFirstInput : true
			});
			$scope.focusMenu = function() {
				return $ionicSideMenuDelegate.isOpen();
			};
			$scope.toggleRight = function() {
				$ionicSideMenuDelegate.toggleRight();
			};
			$scope.search = function(buttonText) {
				SearchStore.search(buttonText);
			};
			$scope.searchstore = SearchStore;
			$scope.getImage = function(id) {
				return 'http://img.youtube.com/vi/' + id + '/0.jpg';
			};
			$scope.getUrl = function(id) {
				return $sce.trustAsResourceUrl('http://www.youtube.com/embed/'
						+ id);
			};
			$scope.getDetails = function(row) {
				$state.go('nav.details', {
					media : JSON.stringify(row)
				});
			};
		}).controller('StartCtrl', function($scope, $state) {

}).controller('PreviewCtrl',
		function($scope, $state, $stateParams, $window, $rootScope) {
			$scope.db.queryKey($stateParams.searchKey);
			console.log($stateParams);
			$scope.title = $stateParams.title;
			$scope.style = {
					theme: $stateParams.theme
			};
			$scope.state=$state;

			$scope.range= function(n) {
				return new Array(n);
			};
			$scope.selected = 1;
}).controller('DetailsCtrl', function($scope, $stateParams, $http, FavouriteService,$ionicPopup,$window) {
	var favourites = FavouriteService;
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
	$scope.addFavourites =function() {
		var result = $ionicPopup.confirm({
			title: 'Favourites',
			template: 'Would you like to add this article to your favourites page?'
		});
		result.then(function() {
			if (result) {
				FavouriteService.add($scope.media);
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
});
