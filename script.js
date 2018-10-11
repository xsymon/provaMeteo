/*
* 1)Modularizzare le funzioni rest per poter switchare lingua ed eventuali etichette tramite la checkbox in alto
* 2)Considerare di utilizzare i valore checked e unchecked della checkbox per gestire lo switch della lingua apposto 
 di effettuare controlli sulle variabili lang e currentLang*/
var lang,lat,lng,city;
$.getJSON("http://api.ipstack.com/check?access_key=69831435fe030d57806f11e629aff841",function(lookup){
	lat = lookup.latitude;
	lng = lookup.longitude;
	lang = lookup.country_code;
	city = lookup.city;

	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&APPID=58ad25c4cad94fc8e2f07596966b4d2d&units=metric&lang="+lang,function(json){
		console.log(json);
		currentLang  = lang;
		//Title and Description setting
		$("#title").text(city);
		$("#description").text(json.weather[0].description);
		//Setting button label
		$(".btn.btn-default.toggle-on").text(lang);
		$(".btn.btn-default.active.toggle-off").text("EN");
		//Set main-box information
		$("#main-box").html(
			"Temperatura: "+json.main.temp+"°C"+
			" </br> Pressione: "+json.main.pressure+
			" </br> Umidità: "+json.main.humidity+
			" </br> Temperatura minima: "+json.main.temp_min+"°C"+
			" </br> Temperatura massima: "+json.main.temp_max+"°C"
		);

		//Event section
		$("#lang-switch").change(function(){
			if(currentLang == lang){
				currentLang = "EN";
				//Set language
			}else{
				currentLang = lang;
				//Set current language
			}
		});
	})
});





