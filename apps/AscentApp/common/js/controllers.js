ascent.controller('MainCtrl', function($scope, $rootScope, DBService) {
	var db = new DBService();
	db.insertMock();
	$scope.db = db;
}).controller('StartCtrl', function($scope,$location) {
	$scope.filterby = function(filter) {
		$location.path('/' + filter);
	};
}).controller('CAMSCtrl', function($scope){
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
}).controller('PreviewCtrl', function($scope,$sce) {
	$scope.db.queryKey('c');
	$scope.getUrl = function(url) {
		console.log(url);
		return $sce.trustAsResourceUrl(url);
	};
}).controller('CCtrl', function($scope,$sce) {
	$scope.db.queryKey('c');
	$scope.title='Cloud';
	$scope.getUrl = function(url) {
		console.log(url);
		return $sce.trustAsResourceUrl(url);
	};
}).controller('ACtrl', function($scope,$sce) {
	$scope.title='Analytics';
	$scope.db.queryKey('a');
	$scope.getUrl = function(url) {
		return $sce.trustAsResourceUrl(url);
	};
}).controller('MCtrl', function($scope,$sce) {
	$scope.title='Mobile';
	$scope.db.queryKey('m');
	$scope.getUrl = function(url) {
		console.log(url);
		return $sce.trustAsResourceUrl(url);
	};
}).controller('SCtrl', function($scope,$sce) {
	$scope.title='Social';
	$scope.db.queryKey('s');
	$scope.getUrl = function(url) {
		console.log(url);
		return $sce.trustAsResourceUrl(url);
	};
});

