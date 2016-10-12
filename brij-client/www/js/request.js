//hide this information
var SERVER_URL = "http://localhost:8080";
var LOGIN = "/login?username=:username&password=:password";
var LOGOUT = "/logout";
var HEARTBEAT = "/heartbeat";
var GET_CURRENT_USER = "/user/current";
var UPDATE_USER = "/user/save";
var SAVE_POST = "/posting/save";
var GET_POSTS = "/posting/findAll";
var GET_POST_BY_ID = "/posting/findById?id=:id";
var GET_MY_POSTS = "/posting/findByUser";
var GET_ALL_SERVICES = "/service/findAll";
var UPDATE_NOTIFICATION = "/notification/edit";
var GET_USER_NOTIFICATION = "/notification/findByUser";
var CREATE_REQUEST = "/request/save";
var GET_REQUEST_BY_ID = "/request/findById?id=:id";
var CREATE_SERVICE = "/service/save";
var GET_MY_REQUESTS = "/request/findByRequester";
var REGISTER_USER = "/user/register";

//Request Types
var GET = "GET";
var POST = "POST";
var PUT = "PUT";
var DELETE = "DELETE";


var APPLICATION_JSON = "application/json; charset=utf-8";


function initializeUser() {
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
function makeRequest(url, type, data, dataType, successCallBack, errorCallBack) {
    url = SERVER_URL + url;
    console.log(successCallBack);
    $.ajaxSetup({
       beforeSend: function(){
           loading.show("loading");
       },
        complete: function(){
            loading.end();
        }
    });
    $.ajax({
        type: type,
        contentType: dataType,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
        url: url,
        data: data,
        timeout: 600000,
        success: successCallBack,
        error: errorCallBack
    });
}

function defaultError(jqXHR, textStatus, errorThrown) {
    switch (jqXHR.status) {
    case 401:
        if (window.location.href.indexOf("index.html") == -1) {
            window.location = "/index.html";
        }
    default:
        console.log(errorThrown);
    }
}

function checkIfOnline(ifOnline, useDefaultError) {
    var errorCallBack = null;
    if (useDefaultError) {
        errorCallBack = defaultError;
    }
    makeRequest(HEARTBEAT, GET, "", "", ifOnline, errorCallBack);
}
/*
 *	Request functions ENDS
 */