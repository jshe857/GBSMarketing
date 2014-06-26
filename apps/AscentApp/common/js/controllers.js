ascent.controller('MainCtrl', function($scope, $rootScope, DBService, SearchStore) {
	var db = new DBService();
	db.insertMock();
	$scope.db = db;
	$scope.search = function(buttonText) {
		SearchStore.search(buttonText);
	};
	$scope.getImage = function(id){
		return 'http://img.youtube.com/vi/'+id+ '/0.jpg';
	};
	$scope.getUrl = function(id) {
		return '//www.youtube.com/embed/'+id;
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
		console.log(JSON.stringify(row));
		$state.go('details',{media: JSON.stringify(row)});
	};
}).controller('DetailsCtrl', function($scope,$stateParams) {
	$scope.media = JSON.parse($stateParams.media);
});
