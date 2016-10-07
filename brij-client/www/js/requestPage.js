var postID;
var requestID;
var isSavingRequest = false;

$(function () {
    $("#btnBack").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "postings.html";

    });

    $("#btnEdit").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        isSavingRequest = !isSavingRequest;

        $("#requestForm textarea").attr("disabled", !isSavingRequest);

        if (isSavingRequest) {
            $("#btnEdit").html("Save");
            $("#btnCancel").removeClass("hide");
        } else {
            $("#btnEdit").html("Edit");
            $("#btnCancel").addClass("hide");
            updateRequest();
        }
    });

    getRequest($.urlParam("id"));

});

function updateRequest() {
    var updateRequest = {
        notes: $("#requestForm #notes").val(),
        postID: postID
    };
    makeRequest(CREATE_REQUEST, POST, JSON.stringify(updateRequest), APPLICATION_JSON, null, null);
};

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