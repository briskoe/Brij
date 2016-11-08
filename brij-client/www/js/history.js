/**
 * Javascript meant for history
 */
var filterBy = "myPosts";

$(function () {    
    loadInfo(refreshForm)
    getAllPosts();

    $(".btnMyPosts").addClass("active");

    $("#btnMyPosts").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".btnPosts").removeClass("active");
        $("#btnMyPosts").addClass("active");
        getAllPosts();
    });

    $("#btnMyReplies").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".btnPosts").removeClass("active");
        $("#btnMyReplies").addClass("active");
        getAllRequests();
    });

});

function refreshForm(data) {
    $("#username").html(data.username);
}

function loadInfo(callback) {
    makeRequest(GET_CURRENT_USER, GET, "", APPLICATION_JSON, callback, null);
}

function getAllPosts() {
    makeRequest(GET_POST_HISTORY, GET, "", "", createHistoryList, null);
}

function getAllRequests() {
    makeRequest(GET_MY_REQUESTS, GET, "", "", createMyRequestList, null);
}

function createHistoryList(data) {
    var listItems = "";
    var array = data.list;
    noOfPages = data.numberOfPages;
    currentPage = data.currentPage;
    console.log(data);
    for (var i = 0; i < array.length && i < 10; i++) {
        var badge1 = "Number of Replies: " + data.countMap[array[i].id];
        var badge2 = "Date: " + new Date(array[i].creationDate).toLocaleString();
        var service = data.titleMap[array[i].id];

        listItems += listItemGenerator("", array[i].id, "historyListItem", "Title: " + array[i].title, "Service: " + service, badge1, badge2);

    }

    $("#historyList").html(listItems);

    $(".historyListItem").click(function (e) {
        $("#postInfoModal").modal('show');
        var url = GET_REQUESTS_BY_POST_ID;
        url += "?postID=" + this.id;
        makeRequest(url, GET, "", "", createRequestList, null);
    });
}

function createRequestList(data) {
    var listItems = "";
    var array = data;
    console.log(data);
    for (var i = 0; i < array.length && i < 10; i++) {
        var date = new Date(array[i].creationDate).toLocaleDateString();
        listItems += listItemGenerator("request.html?id=" + array[i].requestID, "", "historyListItem", "Reply From: " + array[i].userID, "", "Date: " + date, "");

    }
    console.log(listItems);
    $("#requestList").html(listItems);
}

function createMyRequestList(data) {
    var listItems = "";
    var array = data.list;
    noOfPages = data.numberOfPages;
    currentPage = data.currentPage;
    var titles = data.postTitles;
    for (var i = 0; i < array.length && i < 10; i++) {
        var requestId = array[i].requestID;
        var date = new Date(array[i].creationDate).toLocaleDateString();
        listItems += listItemGenerator("request.html?id=" + requestId, requestId, "requestListItem", "Post Title: " + titles[requestId],"Service: " + data.serviceTitles[requestId], array[i].status, "Date: " + date);

    }

    $("#historyList").html(listItems);
}