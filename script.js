//Switch setting
$("#lang-switch").bootstrapToggle({
	on:"IT",
	off:"EN"
});
$('#unit-switch').bootstrapToggle({
     on: 'Celsius',
     off: 'Kelvin'
});

//Main
currentUnit = "metric";
lang = "IT";
weatherService.lookupCall(function(lookupObj){
	weatherCall(lookupObj.latitude,lookupObj.longitude,lookupObj.country_code,lookupObj.city,currentUnit);
});

//Event section
$("#lang-switch").change(function(){
	if($("#lang-switch").prop('checked')){
		lang = "IT";
	}else{
		lang = "EN";
	}
	weatherService.lookupCall(function(lookupObj){
		weatherCall(lookupObj.latitude,lookupObj.longitude,lang,lookupObj.city,currentUnit);
	});
});

$("#unit-switch").change(function(){
	if($("#unit-switch").prop('checked')){
		currentUnit = "metric";
	}else{
		currentUnit = "imperial";
	}
	weatherService.lookupCall(function(lookupObj){
		weatherCall(lookupObj.latitude,lookupObj.longitude,lang,lookupObj.city,currentUnit);
	});
});


//Utils section
function capitalizeFirst(str){
	return str.charAt(0).toUpperCase() + str.substr(1);
}



