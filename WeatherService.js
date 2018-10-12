var weatherService = function(successFn){ 
	var	unit="metric",
		lat,
		lng,
		city;

	function lookupCall(successFn){
		RestModule.callRestService("http://api.ipstack.com/check?access_key=69831435fe030d57806f11e629aff841", successFn);
	}

	return{
		lookupCall : lookupCall
	}

}();

function weatherCall(lat,lng,lang,city,unit){
	RestModule.callRestService("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&APPID=58ad25c4cad94fc8e2f07596966b4d2d&units="+unit+"&lang="+lang,function(json){

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
		
		var template = $("#template").html();
        var rendered = Mustache.render(template,JSON.parse(data));
        $('#main-box').html(rendered);
		

		//Title and Description setting
		/*$("#title").text(city);
		$("#description").text(capitalizeFirst(json.weather[0].description));
		//Set main-box information
		$("#main-box").html(
			"Temperatura: "+json.main.temp+unitMarker+
			" </br> Pressione: "+json.main.pressure+
			" </br> Umidità: "+json.main.humidity+
			" </br> Temperatura minima: "+json.main.temp_min+unitMarker+
			" </br> Temperatura massima: "+json.main.temp_max+unitMarker
		);*/
	});
}