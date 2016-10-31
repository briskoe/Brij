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
        filterBy = "myPosts";
        $(".btnPosts").removeClass("active");
        $("#btnMyPosts").addClass("active");
        getAllPosts();
    });

    $("#btnMyReplies").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        filterBy = "myRequests";
        $(".btnPosts").removeClass("active");
        $("#btnReplies").addClass("active");
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
        var badge = data.countMap[array[i].id];

        if (i % 2 === 0) {
            listItems += "<a href='#' class='list-group-item historyListItem' id='" + array[i].id + "'> <span class='badge'>" + badge + "</span> " + array[i].title + "</a>";
        } else {
            listItems += "<a href='#' class='list-group-item list-group-item-info historyListItem' id='" + array[i].id + "'>" + "<span class='badge'>" + badge + "</span>" + array[i].title + "</a>";
        }
    }

    var paginatingBtn = "";
    for (var i = 0; i < noOfPages; i++) {
        var currentIndex = i + 1;
        var paginationClass = "";
        console.log(currentIndex + " " + currentPage)
        if (currentIndex === currentPage) {
            paginationClass = "disabled currentClass";
        }
        paginatingBtn += "<li class='page-item " + paginationClass + "'> <a id='paginationBtn_" + i + "' class='page-link' href='#' onclick='paginationButtonClick(this)'>" + (currentIndex) + "</a></li>"
    }
    $("#postingPagination").html(paginationDiv("pagination", paginatingBtn));
    $("#postingPagination .backbtn").click(goBack);
    $("#postingPagination .nextBtn").click(goForward);
    console.log(listItems);
    $("#historyList").html(listItems);

    $(".historyListItem").click(function (e) {
        $("#postInfoModal").modal('show');
        var url = GET_REQUESTS_BY_POST_ID;
        url += "?postID=" + this.id;
        makeRequest(url, GET, "", "", createRequestList, null);
    });
}

function goBack(e) {
    e.preventDefault();
    e.stopPropagation();
    var prev = currentPage - 1;
    console.log(prev)
    if (prev > 0) {
        //ids are set from 0-1 so substract one
        paginationButtonClick($("#paginationBtn_" + (prev - 1)));
    }
}

function goForward(e) {
    e.preventDefault();
    e.stopPropagation();
    var next = currentPage + 1;
    console.log(next);
    if (next <= noOfPages) {
        //ids are set from 0-1 so substract one
        paginationButtonClick($("#paginationBtn_" + (next - 1)));
    }
}

function paginationButtonClick(anchor) {
    var pageId = $(anchor).attr("id").split("_")[1];
    var url = GET_POSTS;
    if (filterBy === "myPosts") {
        url = GET_MY_POSTS;
    }

    url += "?pageNo=" + pageId + "";
    makeRequest(url, GET, "", "", createPostingList, null);
}

function createRequestList(data) {
    var listItems = "";
    var array = data;
    console.log(data);
    for (var i = 0; i < array.length && i < 10; i++) {

        if (i % 2 === 0) {
            listItems += "<a href='request.html?id=" + array[i].requestID + "' class='list-group-item historyListItem' id='" + array[i].requestID + "'>" + array[i].userID + "</a>";
        } else {
            listItems += "<a href='request.html?id=" + array[i].requestID + "' class='list-group-item list-group-item-info historyListItem' id='" + array[i].requestID + "'>" + array[i].userID + "</a>";
        }
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
        var badge = new Date(array[i].creationDate).toLocaleDateString();
        if (i % 2 === 0) {
            listItems += "<a href='request.html?id=" + requestId + "' class='list-group-item' id='request#" + requestId + "'> <span class='badge'>" + badge + "</span> " + titles[requestId] + "</a>";
        } else {
            listItems += "<a href='request.html?id=" + requestId + "' class='list-group-item list-group-item-info' id='request#" + requestId + "'>" + "<span class='badge'>" + badge + "</span>" + titles[requestId] + "</a>";
        }
    }

    var paginatingBtn = "";
    for (var i = 0; i < noOfPages; i++) {
        var currentIndex = i + 1;
        var paginationClass = "";
        console.log(currentIndex + " " + currentPage)
        if (currentIndex === currentPage) {
            paginationClass = "disabled currentClass";
        }
        paginatingBtn += "<li class='page-item " + paginationClass + "'> <a id='paginationBtn_" + i + "' class='page-link' href='#' onclick='paginationButtonClick(this)'>" + (currentIndex) + "</a></li>"
    }
    $("#postingPagination").html(paginationDiv("pagination", paginatingBtn));
    $("#postingPagination .backbtn").click(goBack);
    $("#postingPagination .nextBtn").click(goForward);

    $("#historyList").html(listItems);
}