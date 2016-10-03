var postID;
var requestID;

$(function () {
    $("#btnBack").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "postings.html";

    });

    $("#btnEdit").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        //requestService();
    });

    getRequest($.urlParam("id"));

});


function requestService() {
    window.location.href = "createRequest.html?id=" + id;
}

function getRequest(id) {
    //Need to get based on id
    var url = GET_REQUEST_BY_ID;
    url = url.replace(":id", id);
    makeRequest(url, GET, "", "", populateRequest, null);
}

function populateRequest(data) {
    postID = data.posting.id;
    requestID = data.request.id;

    $("#postName").html(data.posting.title);
    if (data.posting.isPost) {
        $("#requestType").html("You have requested this service");
    } else {
        $("#requestType").html("You have requested to perform this service");
    }
    $("#service").val(data.serviceName);
    $("#description").val(data.posting.details);
    $("#notes").val(data.request.notes);
}