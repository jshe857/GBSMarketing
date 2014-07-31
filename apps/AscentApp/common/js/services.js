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
						};
						var populateDB = function(tx) {
							tx.executeSql('DROP TABLE IF EXISTS MEDIA');
							tx
									.executeSql('CREATE TABLE IF NOT EXISTS MEDIA (id unique, title VARCHAR,country VARCHAR, c BIT,a BIT,m BIT,s BIT,bank BIT, govt BIT, telecom BIT, mine BIT)');
							for (var i = 0; i < mediaData.length; i++) {
								tx
										.executeSql('INSERT INTO MEDIA (id, title,country,c,a,m,s,bank,govt,telecom,mine) VALUES ('
												+ mediaData[i] + ')');
							}
						};
						var queryDB = function(tx) {
							tx.executeSql('SELECT * FROM MEDIA WHERE '
									+ searchColumn + '=1', [], addToList,
									errorCB);
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
							searchColumn = "1";
							this.db.transaction(queryDB, errorCB);
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
				'Cloud' : 'c',
				'Analytics' : 'a',
				'Mobile' : 'm',
				'Social' : 's',
				'Banking' : 'bank',
				'Government' : 'govt',
				'Telecommunications' : 'telecom',
				'Mining' : 'mine'
			};
			obj.search = function(category) {
				$state.go('nav.search', {
					searchKey : this[category],
					title : category
				});
			}
			return obj;
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
