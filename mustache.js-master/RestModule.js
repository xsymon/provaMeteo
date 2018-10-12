var RestModule = function(){

	function callRestService(jsonURL,successFn){
		$.ajax({
			type:"POST",
			dataType:"jsonp",
			url:jsonURL,
			contentType:"application/json; charset=utf-8",
			success: successFn
		});
	}

	return{
		callRestService : callRestService
	}
}();