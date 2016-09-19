//hide this information
var SERVER_URL = "http://localhost:8080";
var LOGIN = "/login?username=:username&password=:password";
var HEARTBEAT = "/heartbeat";
var GET_CURRENT_USER = "/user/current";

//Request Types
var GET = "GET";
var POST = "POST";
var PUT = "PUT";
var DELETE = "DELETE";


var APPLICATION_JSON = "Application/Json";
/*
*	Request functions
*/
	function makeRequest(url, type, data, dataType, successCallBack, errorCallBack){
				url = SERVER_URL + url;
				$.ajax({ 
		             type: type,
					 dataType: dataType,
					 headers: {"X-Requested-With": "XMLHttpRequest"},
		             url: url,
					 data: data,
		             success: successCallBack,
		             error: errorCallBack
		         }); 
	}
	function defaultError(jqXHR, textStatus, errorThrown){
		switch(jqXHR.status){
			case 401: window.location = "/index.html";
			default: console.log(errorThrown);
		}
	}
	
	function checkIfOnline(ifOnline, useDefaultError){
		var errorCallBack = null;
		if(useDefaultError){
			errorCallBack = defaultError;
		}
		makeRequest(HEARTBEAT, GET, "", "", ifOnline, errorCallBack);
	}
/*
*	Request functions ENDS
*/