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

    $("#btnShowRequest").click(function(e){
        var url = GET_REQUESTS_BY_POST_ID;
        url += "?postID=" + postID;
        makeRequest(url, GET, "", "", createRequestList, null);   
    });
    getPosts($.urlParam("id"));

});

function createRequestList(data) {
    var listItems = "";
    var array = data;
    for (var i = 0; i < array.length && i < 10; i++) {

        if (i % 2 === 0) {
            listItems += "<a href='request.html?id=" + array[i].requestID + "' class='list-group-item historyListItem' id='" + array[i].requestID + "'>" + array[i].userID + "</a>";
        } else {
            listItems += "<a href='request.html?id=" + array[i].requestID + "' class='list-group-item list-group-item-info historyListItem' id='" + array[i].requestID + "'>" + array[i].userID + "</a>";
        }
    }
    if(array.length === 0){
        listItems = "<h3 class='list-group-item'>No request to show</h3>"
    }
    $("#requestList").html(listItems);
}
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
    var hasRequest = data.hasRequested;
    if (data.posting.isPost) {
        messageInfo = IS_POSTING_MESSAGE_FOR_OTHERS;
        $("#btnRequest").html("Request Service");
    } else {
        messageInfo = IS_REQUEST_MESSAGE_FOR_OTHERS;
        $("#btnRequest").html("Fulfill Request");

    }
    
    if(hasRequest){
        $("#btnRequest").html("View your request");
    }
    $("#btnRequest").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        if(hasRequest){
            window.location = "request.html?id=" + data.requestID;
        }else{
            requestService();
        }
    });


    $("#isPostDiv").html(messageInfo);
    
    var isOwner = (data.isOwner);
    if(isOwner){
        $(".showOwner").removeClass("hide");
    }else{
        $(".showUser").removeClass("hide");
    }

    
}