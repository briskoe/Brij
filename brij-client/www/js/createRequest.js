var id;

$(function () {
    $("#btnSave").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        savePost();
    });

    $("#btnCancel").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "post.html?id=" + id;
    });

    getPosts($.urlParam("id"));

});

function getPosts(postID) {
    id = postID;
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

function savePost() {
    var newRequest = {
        notes: $("#requestForm #notes").val(),
        postID: id
    };

    makeRequest(CREATE_REQUEST, POST, JSON.stringify(newRequest), APPLICATION_JSON, saveRequestComplete, null);
}

function saveRequestComplete(data) {
    //add successful check
    window.location.href = "post.html?id=" + id;
}