var ID=0;
var TITLE=1;
var COUNTRY=2;
var CLOUD=3;
var ANALYTICS=4;
var MOBILE=5;
var SOCIAL=6;
var BANKING=7;
var GOVERNMENT=8;
var TELECOMMUNICATIONS=9;
var MINING=10;

var favouritesKey = "favourites";
ascent
		.factory(
				'DBService',
				function($rootScope, $http) {
					var operations = function() {
						this.db = window.openDatabase("Database", "1.0",
								"GBS Marketing ANZ", 200000);
						var searchColumn = "1";
						var mediaData = [];

						var errorCB = function(err) {
							console.log("Error processing SQL: " + err.code);
							console.log(err);
						};
						var populateDB = function(tx) {
							tx.executeSql('DROP TABLE IF EXISTS MEDIA');
							tx
									.executeSql('CREATE TABLE IF NOT EXISTS MEDIA (id unique, title VARCHAR,company VARCHAR,country VARCHAR, c BIT,a BIT,m BIT,s BIT,bank BIT, govt BIT, telecom BIT, mine BIT)');
							for (var i = 0; i < mediaData.length; i++) {
								tx
										.executeSql('INSERT INTO MEDIA (id, title,company,country,c,a,m,s,bank,govt,telecom,mine) VALUES ('
												+ mediaData[i] + ')');
							}
						};
						var queryDB = function(tx) {
							tx.executeSql('SELECT * FROM MEDIA WHERE '
									+ searchColumn + '=1', [], addToList,
									errorCB);
						};
						var getDB = function(tx) {
							tx.executeSql('SELECT * FROM MEDIA',[],addToList,errorCB);
						};

						var addToList = function(tx, results) {
							$rootScope.list = new Array();
							for (var i = 0; i < results.rows.length; i++) {
								$rootScope.$apply(function() {
									$rootScope.list.push(results.rows.item(i));
								});
							}
						};
						this.queryAll = function() {
							this.db.transaction(getDB,errorCB);
						};
						this.queryKey = function(key) {
							searchColumn = key;
							this.db.transaction(queryDB, errorCB);
						};
						this.insertData = function(data) {
							mediaData = data;
							this.db.transaction(populateDB, errorCB);
						};
					};
					return operations;
				}).factory('SearchStore', function($state) {
			var obj = {
				'Cloud' : {key: 'c',
						   theme: 'energized'},
				'Analytics' :{key: 'a',
							theme: 'balanced'},
				'Mobile' : {key: 'm',
					theme: 'positive'},
				'Social' : {key:'s',
					theme: 'balanced'},
				'Banking' : {key:'bank',
							 theme: 'balanced'},
				'Government' : {key:'govt',
					theme: 'energized'},
				'Telecommunications' : {key:'telecom',
					theme: 'positive'},
				'Mining' : {key:'mine',
					theme: 'balanced'}
			};
			obj.search = function(category) {
				$state.go('nav.category.introduction', {
					searchKey : this[category].key,
					title : category,
					theme : this[category].theme
				});
			};
			return obj;
		}).service('FavouriteService', function() {
			var favourites = angular.fromJson(localStorage.getItem(favouritesKey));
			if (favourites == null) {
				favourites = [];
			}
			favourites.add = function(media){
				if (this.indexOf(media) == -1) {
					this.push(media);
					localStorage.setItem(favouritesKey,angular.toJson(this));
				}
			};
			favourites.remove = function(media) {
				var index = this.indexOf(media);
				this.splice(index,1);
				localStorage.setItem(favouritesKey,angular.toJson(this));
			};
			return favourites;		
		}).service('EmailService', function($window) {
			this.send = function(form) {
				var csv = "";
				for (var field in form) {
					if (form.hasOwnProperty(field)) {
						csv +=form[field];
						csv +=",";
					}
				}
				console.log(csv);
				var obj = new EmailComposer();
				obj.open({
					to : [ "jeshen@au1.ibm.com" ],
					subject : 'GBS Marketing App Log - ' + new Date(),
					body : "Ascent App data: " + JSON.stringify(form),
					attachments : [ "base64:report.csv//" + $window.btoa(csv) ]
				});
			};
		});
