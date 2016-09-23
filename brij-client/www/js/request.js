//hide this information
var SERVER_URL = "http://localhost:8080";
var LOGIN = "/login?username=:username&password=:password";
var HEARTBEAT = "/heartbeat";
var GET_CURRENT_USER = "/user/current";
var UPDATE_USER = "/user/save";
var CREATE_POST = "/posting/save";
var GET_POSTS = "/posting/findAll";
//Method does not exist yet
var GET_POST_BY_ID = "/posting/findById?id=:id";

//Request Types
var GET = "GET";
var POST = "POST";
var PUT = "PUT";
var DELETE = "DELETE";


var APPLICATION_JSON = "application/json; charset=utf-8";


	function initializeUser()  {
		var user = {};
		user.firstName = "";
		user.lastName = "";
		user.phoneNumber = "";
		user.address = "";
		user.city = "";
		user.province = "";
		user.email = "";
		return user;
	}

/*
*	Request functions
*/
	function makeRequest(url, type, data, dataType, successCallBack, errorCallBack){
				url = SERVER_URL + url;
				console.log(successCallBack);
				$.ajax({ 
		             type: type,
					 contentType: dataType,
					 headers: {"X-Requested-With": "XMLHttpRequest"},
		             url: url,
					 data: data,
					 timeout: 600000,
		             success: successCallBack,
		             error: errorCallBack
		         }); 
	}
	function defaultError(jqXHR, textStatus, errorThrown){
		switch(jqXHR.status){
			case 401:
				if(window.location.href.indexOf("index.html") == -1) {
					window.location = "/index.html";
				}
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