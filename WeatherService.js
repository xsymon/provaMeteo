var weatherService = function(successFn){ 
	var	unit="metric",
	lat,
	lng,
	city,
	link;

	function lookupCall(successFn){
		RestModule.callRestService("http://api.ipstack.com/check?access_key=69831435fe030d57806f11e629aff841", successFn);
	}

	return{
		lookupCall : lookupCall
	}

}();

function weatherCall(lat,lng,lang,city,unit){
	if(lat,lng != undefined){
		link = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&APPID=58ad25c4cad94fc8e2f07596966b4d2d&units="+unit+"&lang="+lang;
	}else if(city != undefined){
		link = "http://api.openweathermap.org/data/2.5/weather?APPID=58ad25c4cad94fc8e2f07596966b4d2d&units="+unit+"&lang="+lang+"&q="+city;
	}
	
	RestModule.callRestService(link,function(json){
		if(unit == "metric"){
			unitMarker = "°C"
		}else{
			unitMarker = "°K"
		}

		italianLabels = '{'+
		'"temp":"Temperatura",'+
		'"value1":'+'"'+json.main.temp+'",'+
		'"unitMarker":'+'"'+unitMarker+'",'+
		'"pressure":"Pressione",'+
		'"value2":'+'"'+json.main.pressure+'",'+
		'"unitMarker":'+'"'+unitMarker+'",'+
		'"humidity":"Umidità",'+
		'"value3":'+'"'+json.main.humidity+'",'+
		'"unitMarker":'+'"'+unitMarker+'",'+
		'"min_temp":"Temperatura minima",'+
		'"value4":'+'"'+json.main.temp_min+'",'+
		'"unitMarker":'+'"'+unitMarker+'",'+
		'"max_temp":"Temperatura massima",'+
		'"value5":'+'"'+json.main.temp_max+'",'+
		'"unitMarker":'+'"'+unitMarker+'"'+
		'}';

		englishLabels = '{'+
		'"temp":"Temperature",'+
		'"value1":'+'"'+json.main.temp+'",'+
		'"unitMarker":'+'"'+unitMarker+'",'+
		'"pressure":"Pressure",'+
		'"value2":'+'"'+json.main.pressure+'",'+
		'"unitMarker":'+'"'+unitMarker+'",'+
		'"humidity":"Humidity",'+
		'"value3":'+'"'+json.main.humidity+'",'+
		'"unitMarker":'+'"'+unitMarker+'",'+
		'"min_temp":"Lowest temperature",'+
		'"value4":'+'"'+json.main.temp_min+'",'+
		'"unitMarker":'+'"'+unitMarker+'",'+
		'"max_temp":"Highest temperature",'+
		'"value5":'+'"'+json.main.temp_max+'",'+
		'"unitMarker":'+'"'+unitMarker+'"'+
		'}';
		
		if(lang == "IT"){
			data = italianLabels;
		}else{
			data = englishLabels;
		}

		$("#title").text(city);
		$("#description").text(capitalizeFirst(json.weather[0].description));
		
		var template;
		if(cachedTemplate == undefined){
			template = $("#template").html();
			cachedTemplate = template;
			var rendered = Mustache.render(template,JSON.parse(data));
			$('#main-box').html(rendered);
		}else{
			var rendered = Mustache.render(cachedTemplate,JSON.parse(data));
			$('#main-box').html(rendered);
		}	
	})
}