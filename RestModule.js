var RestModule = function(){ 

	function callRestService(jsonURL,successFn){
		$.getJSON(jsonURL,successFn)
			.done(function(){
				isDone = true;
				console.log("Call done!");
			});
	}

	return{
		callRestService : callRestService
	}
}();