var postID;
var isDisabled = true;

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

    $("#btnEdit").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        isDisabled = !isDisabled;
        $("#postForm .postinput").attr("disabled", isDisabled);
        if (isDisabled) {
            savePost();
            $("#btnEdit").html("Edit");
            $("#btnCancel").addClass("hide");
        } else {
            $("#btnEdit").html("Save");
            $("#btnCancel").removeClass("hide");
        }
    });

    $("#btnCancel").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        isDisabled = !isDisabled;
        $("#postForm .postinput").attr("disabled", isDisabled);

        if (isDisabled) {
            $("#btnEdit").html("Edit");
            $("#btnCancel").addClass("hide");
        } else {
            $("#btnEdit").html("Save");
            $("#btnCancel").removeClass("hide");
        }
    });

    $("#reportBtn").click(function(e){
        $("#txaMessage").val("");
        $("#lstType").val("post");
        $("#lstType").attr("disabled", true);
        additionalTicketComment += "Post: " + postID;
        $("#reportModal").modal(); 
    });

    getPosts($.urlParam("id"));

});

function savePost() {
    var updatePost = {
        id: postID,
        title: $("#postForm #title").val(),
        details: $("#postForm #description").val()
    };


    makeRequest(SAVE_POST, POST, JSON.stringify(updatePost), APPLICATION_JSON, null, null);
}

function requestService() {
    window.location.href = "createRequest.html?id=" + id;
}

function getPosts(id) {
    //Need to get based on id
    postID = id;
    var url = GET_POST_BY_ID;
    url = url.replace(":id", id);
    makeRequest(url, GET, "", "", populatePost, null);
}

function populateUserInfo(data){
    $("#username").html(data.username);
    $("#userForm #firstName").val(data.firstName);
    $("#userForm #lastName").val(data.lastName);
    $("#userForm #phoneNumber").val(data.phoneNumber);
    $("#userForm #address").val(data.address);
    $("#userForm #city").val(data.city);
    $("#userForm #province").val(data.province);
    $("#userForm #email").val(data.email);
    $("#userForm #firstName").html();
}

function populatePost(data) {
    id = data.posting.id;
    populateUserInfo(data.posting.user);
    $("#postName").html(data.posting.title);
    $("#postForm #title").val(data.posting.title);
    $("#postForm #serviceName").val(data.serviceName);
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
    
    if (data.isOwner) {
        $("#btnRequest").hide();
    } else {
        $("#btnEdit").hide();
    }
    
}