var id;

$(function () {
    $("#btnBack").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "postings.html";

    });

    $("#btnRequest").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        requestService();
    });

    getPosts($.urlParam("id"));

});


function requestService() {
    window.location.href = "createRequest.html?id=" + id;
}

function getPosts(id) {
    //Need to get based on id
    var url = GET_POST_BY_ID;
    url = url.replace(":id", id);
    makeRequest(url, GET, "", "", populatePost, null);
    console.log(id);
}

function populatePost(data) {
    id = data.posting.id;
    $("#postForm #title").val(data.posting.title);
    $("#postForm #service").val(data.serviceName);
    $("#postForm #description").val(data.posting.details);
    var messageInfo = "";

    if (data.posting.isPost) {
        messageInfo = IS_POSTING_MESSAGE_FOR_OTHERS;
        $("#btnRequest").html("Request Service");
    } else {
        messageInfo = IS_REQUEST_MESSAGE_FOR_OTHERS;
        $("#btnRequest").html("Fulfill Request");

    }

    $("#isPostDiv").html(messageInfo);
}