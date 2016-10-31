/**
	Global Variables
*/
/**
    Constants
*/
var IS_REQUEST_MESSAGE_FOR_OTHERS = "This post is requesting for help";
var IS_POSTING_MESSAGE_FOR_OTHERS = "This post is offering a service"
var MINIMUM_PASSWORD_LENGTH = 5;
var MAXIMUM_PASSWORD_LENGTH = 15;
var global_notifications;
var NOTIFICATION_LIMIT = 10;
//settings values
var search_km = 25;

var notification_timer;
var PROVINCES = {
    ON: "Ontario",
    QC: "Quebec",
    NS: "Nova Scotia",
    NB: "New Brunswick",
    MB: "Manitoba",
    BC: "British Columbia",
    PE: "Prince Edward Island",
    SK: "Saskatchewan",
    AB: "Alberta",
    NL: "Newfoundland and Labrador"
    
}
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

    }
};

$(function () {
    if (window.location.href.indexOf("index.html") == -1) {
        checkIfOnline(null, true);
    }

    initializeMainMenu();

    //set up a timer to look out for unread notifications
    notificationRequest();
    notification_timer = setInterval(notificationRequest, 50000);
    
    setupStorage();
    setupSettingModal();
    setupScrollable();
});

function setupScrollable(){
    var window_height = $(window).height(),
    content_height = window_height - 200;
    $('.scrollableArea').height(content_height);
}
$( window ).resize(function() {
   var window_height = $(window).height(),
   content_height = window_height - 200;
   $('.scrollableArea').height(content_height);
});

function setupSettingModal(){
    var modal = "<div class='container' ><div id='settingModal' class='modal fade' role='dialog'>" +
        "<div class='modal-dialog'>" +
        "<div class='modal-content'> <div class='modal-header'>" +
        "<button type='button' class='close' data-disiss='modal'>&times;</button>"+
        "<h4>Setting</h4> </div>" +
        "<div class='modal-body'> " +
        settingBody() +
        "</div><div class='modal-footer'>" +
        "<button type='button' class='btn btn-info' id='btnSaveSetting' > Save </button>" +
        "<button type='button' class='btn btn-default' data-dismiss='modal'>close</button>" + "</div> </div> </div>" +
        "</div> </div>";
    $("body").append(modal);
    
    
    $("#btnSaveSetting").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        //get the distance for the km.
        var distanceKm = $("#txtKm").val();
        if(window.localStorage){
            window.localStorage.setItem("searchKm", distanceKm);
            search_km = distanceKm;
            $("#txtKm").val(distanceKm);
            $("#settingModal").modal("hide");
        }
    })
}

function settingBody(){
    var modalBody = "<div>"
    +"<form novalidate onSubmit='return false'>"+
        "<div class='form-group'><label>Distance to filter (km)</label> <input class='form-control' type='number' id='txtKm' value='"+search_km+"'/> </div> " + 
    "</form> </div>"
    return modalBody;
}
function setupStorage(){
    if(window.localStorage){
        var seachKmSetting = localStorage.getItem("searchKm");
        if (seachKmSetting !== null) {
            search_km = seachKmSetting;
        }else{
            window.localStorage.setItem("searchKm", 25);
        }

    }
}

function initializeMainMenu() {
    $("nav.mainMenu .navbar-header").append(
        "<div id='notificationDropDown'> <button id='notificationBtn' class='navbar-toggle dropdown-toggle glyphicon glyphicon-bell' data-toggle='dropdown'> </button> </div>"
    );
    $("#notificationDropDown").append(
        "<ul class='dropdown-menu dropdown-menu-right' id='notificationNavBar'> </ul>"
    );
    var navbar = "" +
        "<li class='menuLinks'><a href='postings.html'>Postings</a></li>" +
        "<li class='menuLinks'><a href='accountDetails.html'>Account Details</a></li>" +
        "<li class='menuLinks'><a href='history.html'>History</a></li>" +
        "<li class='menuLinks'><a href='#' id='btnSetting' >Settings </a></li>" +
        "<li class='menuLinks'><a id='logoutMenuItem'>Logout</a></li>";
    $("#navbar").html(navbar);

    $("#logoutMenuItem").click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        makeRequest(LOGOUT, POST, "", "", function (data) {
            window.location = "/index.html"
        }, null);
    });

    $("#brijHome").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "postings.html";
    });
    
    $("#btnSetting").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#txtKm").val(search_km);
        $("#settingModal").modal();
        $("#myNavbar").removeClass("in");
    })
}

function notificationRequest() {
    makeRequest(GET_USER_NOTIFICATION, GET, "", "", fillNotifications, null);
}

function fillNotifications(data) {
    global_notifications = data;
    var noOfNotification = data.noOfUnRead;
    if (noOfNotification !== undefined && noOfNotification !== 0) {
        $("#notificationBtn").html("<span class='badge notification-badge'>" + data.noOfUnRead + "</span>")
    }
    var notifications = data.notifications;
    var navbar = "<li class='dropdown-header' ><h6 class=dropdown-header'>Notifications:</h6> </li>";
    if (notifications !== undefined) {
        for (var i = 0; i < notifications.length; i++) {
            var href = "";
            var classCss = "";
            if (!notifications[i].readFlag) {
                classCss = "bg-danger readFlag";
            }
            var notificationId = notifications[i].id;
            if (notifications[i].type === "request") {
                href = "request.html?id=" + notifications[i].targetID;
            } else if (notifications[i].type === "conversation") {
                href = "request.html?id=" + notifications[i].targetID + "&openConvo=true";
            }
            navbar += "<li class='dropdown-item " + classCss + "'><a id='notification_" + notificationId + "' onclick='return notificationOnClick(this)' href='" + href + "' class='" + classCss + "'> " + notifications[i].description + "</a></li>";

        }
    }

    navbar += "<li class='dropdown-item'><div class='dropdown-divider'></div></li> " +
        "<li class='dropdown-item' > <a href='notifications.html' >View all notifications</a> </li>";

    $("#notificationNavBar").html(navbar);
}

function notificationOnClick(anchor) {
    var nId = $(anchor).attr("id").split("_")[1];
    var hasClass = $(anchor).hasClass("readFlag");
    console.log(anchor);
    if (hasClass) {
        console.log("As")
        var notification = {
            id: nId,
            readFlag: true
        };
        makeRequest(UPDATE_NOTIFICATION, POST, JSON.stringify(notification), APPLICATION_JSON, function () {
            window.location = $(anchor).attr("href");

        }, null);
        return false;
    }
    return true;

}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}

function paginationDiv(id, item) {
    var pagination = "<nav aria-label='Page navigation' id='" + id + "'><ul class='pagination'>" +
        "<li class='page-item'> <a href='#' class='page-link backbtn' aria-label='Previous'>" +
        "<span aria-hidden='true'>&laquo;</span>" +
        "<span class='sr-only'>Previous</span></a> </li>" +
        item +
        "<li class='page-item'> <a class='page-link nextBtn' aria-label='Next'>" +
        "<span aria-hidden='true'>&raquo;</span>" +
        "<span class='sr-only'>Next</span></a> </li>" +
        "</lu></nav>";
    return pagination;
}
/**
*   SETUP settings
*/




var loading = {
    show: function () {
        if (!$("#loadingDiv").length) {
            $("<div id='loadingDiv'><h3>Loading<br><span class='glyphicon glyphicon-refresh gly-ani'></span></h3> </div>")
                .css({
                    display: "block",
                    opacity: 0.90,
                    position: "fixed",
                    padding: "7px",
                    "text-align": "center",
                    background: "black",
                    color: "white",
                    width: "270px",
                    left: ($(window).width() - 284) / 2,
                    top: $(window).height() / 2
                })
                .appendTo($("body"));
        }

    },
    end: function () {
        $("#loadingDiv").fadeOut("slow", function () {
            this.remove();
        })
    }

};