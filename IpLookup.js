var RestModule = function () {    
    function callRestService(jsonURL,successFn) {
        $.getJSON(jsonURL, successFn);
    }
    
    return {
        callRestService: callRestService
    }
}();