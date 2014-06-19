ascent
		.factory(
				'DBService',
						function($rootScope) {
							var operations = function() {
								this.db = window.openDatabase("Database",
										"1.0", "Cordova Demo", 200000);
								var searchColumn = "1";
								var errorCB = function(err) {
									console.log("Error processing SQL: "
											+ err.code);
								};
								var populateDB = function(tx) {
									tx.executeSql('DROP TABLE IF EXISTS DEMO');
									tx
											.executeSql('CREATE TABLE IF NOT EXISTS DEMO (url unique, title, c BIT,a BIT,m BIT,s BIT,bank BIT, govt BIT, telecom BIT, mine BIT)');
									tx
											.executeSql('INSERT INTO DEMO (url, title,c,a,m,s,bank,govt,telecom,mine) VALUES ("1AePeB7iCpI", "IBM Big Data in a Minute",0,1,0,0,1,1,1,1)');
									tx
											.executeSql('INSERT INTO DEMO (url, title,c,a,m,s,bank,govt,telecom,mine) VALUES ("ZFLLER32pQE", "Mobile Enterprise",0,0,1,0,1,1,1,1)');
									tx
											.executeSql('INSERT INTO DEMO (url, title,c,a,m,s,bank,govt,telecom,mine) VALUES ("xc4mQc3CW5c", "IBM Cloud marketplace",1,0,0,0,1,1,1,1)');
									tx
											.executeSql('INSERT INTO DEMO (url, title,c,a,m,s,bank,govt,telecom,mine) VALUES ("jQvNfPTQMkk", "What is IBM?",1,1,1,1,1,1,1,1)');
									tx
											.executeSql('INSERT INTO DEMO (url, title,c,a,m,s,bank,govt,telecom,mine) VALUES ("rB7VkrUYCAg", "IBM Watson Group Launch",1,1,0,0,1,1,1,1)');								
									tx
											.executeSql('INSERT INTO DEMO (url, title,c,a,m,s,bank,govt,telecom,mine) VALUES ("Q3e4q2wTOOQ", "Cognitive Computing",1,1,0,0,1,1,1,1)');								
									
								};
								var queryDB = function(tx) {
									tx.executeSql('SELECT * FROM DEMO WHERE ' + searchColumn + '=1', [],
											querySuccess, errorCB);
								};

								var querySuccess = function(tx, results) {
									$rootScope.list = new Array();
									var len = results.rows.length;
									$rootScope.numResults = len;
									console.log("DEMO table: " + len
											+ " rows found.");
									for (var i = 0; i < len; i++) {
//										console.log(results.rows.item(i));
										$rootScope.$apply(function() {
											$rootScope.list.push(results.rows
													.item(i));
										});
									}
								};

								this.queryAll = function() {
									searchColumn = "1";
									this.db.transaction(queryDB, errorCB);
								};
								this.queryKey = function(key) {
									searchColumn = key;
									this.db.transaction(queryDB,errorCB);
								};
								this.insertMock = function() {
									this.db.transaction(populateDB, errorCB);
								};

							};
							return operations;
						}).factory('SearchStore',function($state) {
							var obj = {
									'Cloud': 'c',
									'Analytics': 'a',
									'Mobile' : 'm',
									'Social' : 's',
									'Banking' : 'bank',
									'Government': 'govt',
									'Telecommunications' : 'telecom',
									'Mining' : 'mine'
							};
							obj.search = function(category) {
								$state.go('search',{searchKey:this[category] , title: category});
							}
							return obj;
						});
