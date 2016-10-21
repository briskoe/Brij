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

    initializeMainMenu();

    //set up a timer to look out for unread notifications
    notificationRequest();
    notification_timer = setInterval(notificationRequest, 50000);

});


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
}

function notificationRequest() {
    makeRequest(GET_USER_NOTIFICATION, GET, "", "", fillNotifications, null);
}

function fillNotifications(data) {
    console.log(data);
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
            }
            navbar += "<li class='dropdown-item " + classCss + "'><a id='notification_" + notificationId + "' onclick='return notificationOnClick(this)' href='" + href + "' class='" + classCss + "'> " + notifications[i].description + "</a></li>";

        }
    }

    navbar += "<li class='dropdown-item'><div class='dropdown-divider'></div></li> " +
        "<li class='dropdown-item' > <a href='#' >View all notifications</a> </li>";

    $("#notificationNavBar").html(navbar);
}

function notificationOnClick(anchor) {
    var nId = $(anchor).attr("id").split("_")[1];
    var hasClass = $(anchor).hasClass("readFlag");
    if (hasClass) {
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