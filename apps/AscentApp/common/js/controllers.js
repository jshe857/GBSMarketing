ascent.controller(
		'MainCtrl',
		function($scope, $http, DBService, SearchStore, $window, $sce,
				$ionicModal, $ionicSideMenuDelegate) {
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
			}
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
		}).controller('StartCtrl', function($scope, $state) {

}).controller('PreviewCtrl',
		function($scope, $state, $stateParams, $window, $rootScope) {
			$scope.db.queryKey($stateParams.searchKey);
			console.log($stateParams);
			$scope.title = $stateParams.title;
			$scope.style = {
					theme: $stateParams.theme
			};
			$scope.getDetails = function(row) {
				$state.go('nav.details', {
					media : JSON.stringify(row)
				});
			};
			
			$scope.selected = 1;
}).controller('DetailsCtrl', function($scope, $stateParams, $http) {
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
}).controller('FormCtrl', function($scope, EmailService) {
	$scope.client = {};
	$scope.send = function(client) {
		EmailService.send(client);
	};
});
