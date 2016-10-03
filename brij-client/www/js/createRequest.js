$(function () {
    $("#btnSave").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        savePost();
    });

    $("#btnCancel").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "postings.html";
    });

    getPosts($.urlParam("id"));

});

function getPosts(id) {
    //Need to get based on id
    var url = GET_POST_BY_ID;
    url = url.replace(":id", id);
    makeRequest(url, GET, "", "", populatePost, null);
}

function populatePost(data) {
    $("#postName").html(data.posting.title);
    if (data.posting.isPost) {
        $("#requestType").html("You are requesting this service");
    } else {
        $("#requestType").html("You are offering to fulfill this request");
    }
}