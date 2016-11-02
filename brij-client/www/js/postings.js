var filterBy = "allPosts";
var currentPage = 1;
var noOfPages = 1;
$(function () {
    getAllPosts();

    $("#btnSearch").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ($("#txtSearch").val().length > 0) {
            var url = GET_POSTINGS_LIKE;

            if (search_km !== null) {
                url += "?distance=" + search_km;
            }

            url += "&title=" + $("#txtSearch").val();

            makeRequest(url, GET, "", "", createPostingList, null);
        } else {
            getAllPosts();
        }
    });
});

function getAllPosts() {
    var url = GET_POSTS;
    if (search_km !== null) {
        url += "?distance=" + search_km;
    }
    makeRequest(url, GET, "", "", createPostingList, null);
}

function createPostingList(data) {
    var listItems = "";
    var array = data.list;
    console.log(array);
    noOfPages = data.numberOfPages;
    currentPage = data.currentPage;
    for (var i = 0; i < array.length && i < 10; i++) {
        var badge = "REQUEST"
        if (array[i].isPost) {
            badge = "OFFER";
        }
        if (i % 2 === 0) {
            listItems += "<a href='post.html?id=" + array[i].id + "' class='list-group-item' id='posting#" + array[i].id + "'> <span class='badge'>" + badge + "</span> " + array[i].title + "</a>";
        } else {
            listItems += "<a href='post.html?id=" + array[i].id + "' class='list-group-item list-group-item-info' id='posting#" + array[i].id + "'>" + "<span class='badge'>" + badge + "</span>" + array[i].title + "</a>";
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

    $("#postingList").html(listItems);
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

    url += "?pageNo=" + pageId;
    if (search_km !== null) {
        url += "&distance=" + search_km;
    }
    makeRequest(url, GET, "", "", createPostingList, null);
}

function checkNull() {
    if ($("#txtSearch").val() == "") {
        getAllPosts();
    }
}