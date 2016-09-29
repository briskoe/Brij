/**
	Global Variables
*/
/**
    Constants
*/
var IS_REQUEST_MESSAGE_FOR_OTHERS = "This post is requesting for help";
var IS_POSTING_MESSAGE_FOR_OTHERS = "This post is offering a service"

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(function () {
    if (window.location.href.indexOf("index.html") == -1) {
        checkIfOnline(null, true);
    }

    var navbar = "" +
        "<li class='menuLinks'><a href='postings.html'>Postings</a></li>" +
        "<li class='menuLinks'><a href='accountDetails.html'>Account Details</a></li>" +
        "<li class='menuLinks'><a id=logoutMenuItem>Logout</a></li>";
    $("#navbar").html(navbar);
    
    $("#logoutMenuItem").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        
        makeRequest(LOGOUT, POST, "", "", function(data){
            window.location = "/index.html"
        }, null);
    });
    
});

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}