ascent.controller('MainCtrl', function($scope, $http, DBService, SearchStore,$sce,$ionicModal,$ionicPopup) {
	$http.get("insert.json").success(function(data) {
		var db = new DBService();
		db.insertData(data);
		$scope.db = db;
	});
	 $ionicModal.fromTemplateUrl('templates/dataform.html', function(modal) {
		    $scope.modal = modal;
		  }, {
		    animation: 'slide-in-up',
		    focusFirstInput: true
	});
//	$scope.modal = {
//			show: function() {
//				$ionicPopup.confirm({templateUrl:'templates/dataform.html',okText: "Send"});
//			}
//	};
	 

	$scope.search = function(buttonText) {
		SearchStore.search(buttonText);
	};
	$scope.getImage = function(id){
		return 'http://img.youtube.com/vi/'+id+ '/0.jpg';
	};
	$scope.getUrl = function(id) {
		return $sce.trustAsResourceUrl('http://www.youtube.com/embed/'+id);
	};
}).controller('StartCtrl', function($scope,$state) {
	$scope.filterby = function(filter) {
		$state.go(filter);
	};
}).controller('CAMSCtrl', function($scope,$state){
	$scope.button1 = 'Cloud';
	$scope.button2 = 'Analytics';
	$scope.button3 = 'Mobile';
	$scope.button4 = 'Social';
	$scope.filter='<i class="icon ion-cloud"></i> CAMS';
}).controller('IndustryCtrl', function($scope,$state){
	$scope.button1 = 'Banking';
	$scope.button2 = 'Government';
	$scope.button3 = 'Telecommunications';
	$scope.button4 = 'Mining';
	$scope.filter='<i class="icon ion-person"></i>Industry';
}).controller('PreviewCtrl', function($scope,$state,$stateParams,$window,$rootScope) {
	$scope.db.queryKey($stateParams.searchKey);
	$scope.title=$stateParams.title;
	$scope.decideColumnWidth = function() {
		if ($window.innerWidth > 700) {
			return 'col-20';
		} else {
			return 'col-33';
		}
	};
	$scope.getDetails = function(row) {	
		$state.go('details',{media: JSON.stringify(row)});
	};
}).controller('DetailsCtrl', function($scope,$stateParams,$http) {
	$scope.media = angular.fromJson($stateParams.media);
	$http.get("media/"+$scope.media.id+"/main.txt").success(function(data){
		$scope.media.body = data;
	});
	$scope.setBackground = function() {
		var url = "media/" +$scope.media.id + "/body.png";
		return {'background-image':'url("' + url+'")'};
	};

}).controller('FormCtrl', function($scope, EmailService) {
	$scope.client = {};
	$scope.send = function(client) {
		EmailService.send(client);
	};
});
