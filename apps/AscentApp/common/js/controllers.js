ascent.controller('MainCtrl', function($scope, $rootScope, DBService, SearchStore) {
	var db = new DBService();
	db.insertMock();
	$scope.db = db;
	$scope.search = function(buttonText) {
		SearchStore.search(buttonText);
	};
	$scope.getImage = function(url){
		return 'http://img.youtube.com/vi/'+url+ '/0.jpg';
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
	

}).controller('PreviewCtrl', function($scope,$state,$stateParams,$window) {
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
		
		$state.go('details',{mediaId:row.url});
	};
}).controller('DetailsCtrl', function($scope,$stateParams,$sce) {	
	$scope.db.queryMedia($stateParams.mediaId);
	$scope.mediaId = $stateParams.mediaId;
	$scope.getUrl = function() {
		return $sce.trustAsResourceUrl('//www.youtube.com/embed/'+$scope.focusRow.url);
	};
	$scope.getHackUrl = function() {
		return $sce.trustAsResourceUrl('//www.youtube.com/embed/'+$stateParams.mediaId);
	};
});
