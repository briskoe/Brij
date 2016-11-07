var filterBy = "allPosts";
var currentPage = 1;
var noOfPages = 1;
var loadNew = false;
$(function () {
    $('#postingDiv').scroll(function(e){
        e.preventDefault();
        e.stopPropagation();
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight && loadNew) {
                var url = GET_POSTS + "?pageNo="+ currentPage;
                if (search_km !== null) {
                    url += "&distance=" + search_km;
                }
                console.log(currentPage + " " + noOfPages)
                if(currentPage !== noOfPages){

                    makeRequest(url, GET, "", "", function(data){
                        appendPostingList(data);
                    }, null);
                }
        }
        loadNew = true;
    })
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
    noOfPages = data.numberOfPages;
    currentPage = data.currentPage;
    for (var i = 0; i < array.length; i++) {
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
    loadNew = false;
    $("#postingList").html(listItems);

}

function appendPostingList(data) {
    var listItems = "";
    var array = data.list;
    noOfPages = data.numberOfPages;
    currentPage = data.currentPage;
    for (var i = 0; i < array.length; i++) {
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

     $("#postingList").append(listItems);
}



function checkNull() {
    if ($("#txtSearch").val() === "") {
        getAllPosts();
    }
}