ascent.service('SocialService', function($ionicPopup) {

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
