/**
	Global Variables
*/
/**
    Constants
*/
var IS_REQUEST_MESSAGE_FOR_OTHERS = "This post is requesting for help";
var IS_POSTING_MESSAGE_FOR_OTHERS = "This post is offering a service"
var notification_timer;
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
   // toast.show("message");
    //toast.end
    
    initializeMainMenu();

    //set up a timer to look out for unread notifications
    notificationRequest();
    notification_timer = setInterval(notificationRequest, 50000);
    
});


function initializeMainMenu(){
    $("nav.mainMenu .navbar-header").append(
        "<div id='notificationDropDown'> <button id='notificationBtn' class='navbar-toggle dropdown-toggle glyphicon glyphicon-bell' data-toggle='dropdown'> </button> </div>"
    );
    $("#notificationDropDown").append(
        "<ul class='dropdown-menu dropdown-menu-right' id='notificationNavBar'> </ul>"
    );
    var navbar = "" +
        "<li class='menuLinks'><a href='postings.html'>Postings</a></li>" +
        "<li class='menuLinks'><a href='accountDetails.html'>Account Details</a></li>" +
        "<li class='menuLinks'><a id='logoutMenuItem'>Logout</a></li>";
    $("#navbar").html(navbar);
    
    $("#logoutMenuItem").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        
        makeRequest(LOGOUT, POST, "", "", function(data){
            window.location = "/index.html"
        }, null);
    });
    
}
function notificationRequest(){
    makeRequest(GET_USER_NOTIFICATION, GET, "", "", fillNotifications, null);
}

function fillNotifications(data){
    console.log(data);
    $("#notificationBtn").html("<span class='badge notification-badge'>"+data.noOfUnRead+"</span>")
    var notifications = data.notifications;
    var navbar = "<li class='dropdown-header' ><h6 class=dropdown-header'>Notifications:</h6> </li>";
    for(var i = 0; i < notifications.length; i++){
        var href = "";
        if(notifications[i].type === "request"){
            href = "request.html?id=" + notifications[i].targetID;
        }
        navbar += "<li class='dropdown-item'><a href='"+href+"'> "+notifications[i].description+"</a></li>";
        
    }
    navbar += "<li class='dropdown-item'><div class='dropdown-divider'></div></li> " +
        "<li class='dropdown-item' > <a href='#' >View all notifications</a> </li>";
    
    $("#notificationNavBar").html(navbar);
}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}


var toast = {
    show: function(msg){
        	$("<div class='toastID'><h3>"+msg+"</h3></div>")
            .css({ display: "block", 
                opacity: 0.90, 
                position: "fixed",
                padding: "7px",
                "text-align": "center",
                  background:"black",
                  color:"white",
                width: "270px",
                left: ($(window).width() - 284)/2,
                top: $(window).height()/2 })
            .appendTo( $("body") );
    },
    end: function(){
        $(".toastID").fadeOut("slow", function(){
            this.remove();
        })
    }
      
};
