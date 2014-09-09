ascent.factory('SocialShare', function($ionicPopup, ContentFactory) {
	//	<button onclick="window.plugins.socialsharing.shareViaTwitter('Message via Twitter')">message via Twitter</button>
	//	<button onclick="window.plugins.socialsharing.shareViaTwitter('Message and link via Twitter', null /* img */, 'http://www.x-services.nl')">msg and link via Twitter</button>
	//	<button onclick="window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null /* img */, null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)})">msg via Facebook (with errcallback)</button>
	//	
	var social={};
	social.favourite = function(media) {
		var popup = $ionicPopup.confirm({
			title: '<i style="font-size:40px" class="icon ion-ios7-heart energized"></i>',
			template: '<p style="text-align:center">Would you like to add this article to your favourites page?</p>',
			okType: "button-positive button-round",
			cancelType: "button-positive button-round"
		});
		popup.then(function(res) {
			if (res) {
				ContentFactory.favourites.add(media);
			}
		});
	};
	social.tweet = function(media){};
	social.email = function(media){};
	social.post = function(media){};
	social.share = function(media){};
	social.lead = function(media){
		var popup = $ionicPopup.confirm({
			title: 'Share A Lead',
			templateUrl: 'templates/dataform.html',
			okText: "Send",
			okType: "button-balanced button-round",
			cancelType: "button-balanced button-round"
		});
		popup.then(function(res) {
			if (res) {
			}
		});
	};
	return social;

}).service('EmailService', function($window) {
	this.send = function(form) {
		var csv = "";
		for ( var field in form) {
			if (form.hasOwnProperty(field)) {
				csv += form[field];
				csv += ",";
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
}).factory('TestimonialsFactory', function($http, ParseTestimonial) {
	var testimonials = [];
	$http.get("data/testimonials.json").success(function(data) {
		for (var i = 0; i < data.length; i++) {
			testimonials.push(ParseTestimonial(data[i]));
		}
	});
	return testimonials;
}).factory('InfographicsFactory', function($http, ParseInfographic) {
	var infographics = [];
	$http.get("data/infographics.json").success(function(data) {
		for (var i = 0; i < data.length; i++) {
			infographics.push(ParseInfographic(data[i]));
		}
	});
	return infographics;
}).factory('FavouritesFactory', function() {
	var favouritesKey = "favourites";
	var favourites = angular.fromJson(localStorage.getItem(favouritesKey));
	if (favourites == null) {
		favourites = [];
	}
	favourites.add = function(media) {
		console.log(media.title +" : " + this.indexOf(media));
		if (this.indexOf(media) == -1) {
			this.push(media);
			localStorage.setItem(favouritesKey, angular.toJson(this));
		}
	};
	favourites.remove = function(media) {
		var index = this.indexOf(media);
		this.splice(index, 1);
		localStorage.setItem(favouritesKey, angular.toJson(this));
	};
	return favourites;
}).factory('ContentFactory',
		function(FavouritesFactory, TestimonialsFactory, InfographicsFactory) {
			var content = {};
			content.testimonials = TestimonialsFactory;
			content.infographics = InfographicsFactory;
			content.favourites = FavouritesFactory;
			content.search = TestimonialsFactory.concat(InfographicsFactory);
			return content;
		}).factory('SearchHandler', function($state, ContentFactory) {
	var obj = {
		'Cloud' : {
			theme : 'energized'
		},
		'Analytics' : {
			theme : 'balanced'
		},
		'Mobile' : {
			theme : 'positive'
		},
		'Social' : {
			theme : 'balanced'
		},
		'Banking' : {
			theme : 'balanced'
		},
		'Government' : {
			theme : 'energized'
		},
		'Telecomms' : {
			theme : 'positive'
		},
		'Mining' : {
			theme : 'balanced'
		}
	};
	var tempHolder = [];
	for (page in obj) {
		tempHolder.push(page);
	}
	;
	obj.pages = tempHolder;

	obj.search = function(category) {
		$state.go('nav.category.introduction', {
			searchKey : category.toLowerCase(),
			title : category,
			theme : this[category].theme
		});
	};
	obj.details = function(media) {
		$state.go('nav.details', {
			'media' : angular.toJson(media)
		});
	};
	return obj;
});
