//Global variables declaraton
var currentUnit = "metric",
	lang = "IT",
	cachedTemplate,
	isUsed;

//Main
weatherService.lookupCall(function(lookupObj){
	weatherCall(lookupObj.latitude,lookupObj.longitude,lookupObj.country_code,lookupObj.city,currentUnit);
});

//Switch setting
$("#lang-switch").bootstrapToggle({
	on:"IT",
	off:"EN"
});
$('#unit-switch').bootstrapToggle({
     on: 'Celsius',
     off: 'Kelvin'
});

//Event section
$("#lang-switch").change(function(){
	if(!isUsed){
		if($("#lang-switch").prop('checked')){
		lang = "IT";
		}else{
			lang = "EN";
		}
		weatherService.lookupCall(function(lookupObj){
			weatherCall(lookupObj.latitude,lookupObj.longitude,lang,lookupObj.city,currentUnit);
		});
	}
});

$("#unit-switch").change(function(){
	if(!isUsed){
		if($("#unit-switch").prop('checked')){
		currentUnit = "metric";
		}else{
			currentUnit = "imperial";
		}
		weatherService.lookupCall(function(lookupObj){
			weatherCall(lookupObj.latitude,lookupObj.longitude,lang,lookupObj.city,currentUnit);
		});
	}
});

$("#search-button").on('click',function(){
	isUsed = true;
	city = $("#search-input").val();
	weatherCall(undefined,undefined,lang,city,currentUnit);

	$("#lang-switch").change(function(){
		if(isUsed){
			if($("#lang-switch").prop('checked')){
			lang = "IT";
			}else{
				lang = "EN";
			}
			weatherService.lookupCall(function(lookupObj){
				weatherCall(undefined,undefined,lang,city,currentUnit);
			});
		}
	});

	$("#unit-switch").change(function(){
		if(isUsed){
			if($("#unit-switch").prop('checked')){
			currentUnit = "metric";
			}else{
				currentUnit = "imperial";
			}
			weatherService.lookupCall(function(lookupObj){
				weatherCall(undefined,undefined,lang,city,currentUnit);
			});
		}
	});

});

$("#location-button").on('click',function(){
	isUsed = false;
	weatherService.lookupCall(function(lookupObj){
		weatherCall(lookupObj.latitude,lookupObj.longitude,lang,lookupObj.city,currentUnit);
	});
});

//Utils section
function capitalizeFirst(str){
	return str.charAt(0).toUpperCase() + str.substr(1);
}



