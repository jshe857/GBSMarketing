ascent.factory('ParseInfographic',function(){
	var parse = function(data) {
		var infographic = data;
		infographic.previewUrl = 'infographics/JPEG/' + infographic.title.replace(/ /g,'') + '.jpg';
		infographic.mediaUrl = 'infographics/JPEG/' + infographic.title.replace(/ /g,'') + '.jpg';
		infographic.thumbnailUrl = 'infographics/JPEG/' + infographic.title.replace(/ /g,'') +'.jpg';
		return infographic;
	};
	return parse;
}).factory('ParseTestimonial',function($sce,$http){
	var parse = function(data){
		var testimonial = data;
		testimonial.previewUrl = 'http://img.youtube.com/vi/' + testimonial.id + '/0.jpg';
		testimonial.mediaUrl = $sce.trustAsResourceUrl('http://www.youtube.com/embed/'
					+ this.id);
		testimonial.thumbnailUrl = 'media/' + testimonial.id + '/logo.png';
		$http.get("media/" + testimonial.id + "/main.txt").success(function(data) {
			testimonial.bodyText = data;
		});
		return testimonial;
	};
	return parse;
});
