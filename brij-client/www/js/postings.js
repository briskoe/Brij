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
        var additionalClass = "list-group-item";
        var ribbonColor ="";
        if (array[i].isPost) {
            badge = "OFFER";
        }else{
            ribbonColor = "blue"
        }
        if (i % 2 !== 0) {
            additionalClass += " list-group-item-info"
        }
        var ratings = array[i].ratings;
        var starDiv = fillRating(ratings, data["rate_" + array[i].id]);
        var userWord = "";
        if(ratings.length === 1){
            userWord = " - 1 vote";
        }else{
            userWord = " - " + ratings.length + " votes";
        }
        var creationDate = new Date(array[i].creationDate).toLocaleString();
        listItems += "<div ><a class='"+additionalClass+"' href='post.html?id=" + array[i].id + "'  id='posting#" + array[i].id + "'>" + "<div class='ribbon "+ribbonColor+"'><span>" + badge + "</span></div><h3>" + array[i].title + "<small> by " + array[i].user.username+ "</small></h3>"+
            starDiv +userWord+" <br> Posted: "+creationDate+"</a></div>";
    }
    loadNew = false;
    $("#postingList").html(listItems);

}

function fillRating(ratings, avgRate){
    var noOfRatings = ratings.length;
    var starDiv = "";
    for(var i = 0; i < 5; i++){
        var classToUse = "glyphicon ";
        if(i < avgRate){
            classToUse += "glyphicon-star";
        }else{
            classToUse += "glyphicon-star-empty";
        }
        starDiv += "<span class='"+classToUse+"'> </span>"
    }
   return starDiv;
}

function appendPostingList(data) {
    var listItems = "";
    var array = data.list;
    noOfPages = data.numberOfPages;
    currentPage = data.currentPage;
    for (var i = 0; i < array.length; i++) {
        var badge = "REQUEST"
        var additionalClass = "list-group-item";
        var ribbonColor ="";
        if (array[i].isPost) {
            badge = "OFFER";
        }else{
            ribbonColor = "blue"
        }
        if (i % 2 !== 0) {
            additionalClass += " list-group-item-info"
        }
        var ratings = array[i].ratings;
        var starDiv = fillRating(ratings, data["rate_" + array[i].id]);
        var userWord = "";
        if(ratings.length === 1){
            userWord = " - 1 vote";
        }else{
            userWord = " - " + ratings.length + " votes";
        }
        var creationDate = new Date(array[i].creationDate).toLocaleString();
        listItems += "<div ><a class='"+additionalClass+"' href='post.html?id=" + array[i].id + "'  id='posting#" + array[i].id + "'>" + "<div class='ribbon "+ribbonColor+"'><span>" + badge + "</span></div><h3>" + array[i].title + "<small> by " + array[i].user.username+ "</small></h3>"+
            starDiv +userWord+" <br> Posted: "+creationDate+"</a></div>";
    }

     $("#postingList").append(listItems);
}



function checkNull() {
    if ($("#txtSearch").val() === "") {
        getAllPosts();
    }
}