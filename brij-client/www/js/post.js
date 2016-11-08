var postID;
var isDisabled = true;
var post;
var clicked = false;
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
        if (post.isPost) {
            $("#formModal #title").html("You are requesting this service");
        } else {
            $("#formModal #title").html("You are offering to fulfill this request");
        }
        $("#btnSaveForm").html("Send");
        $("#btnSaveForm").click(function(e){
            if(clicked) return;
            clicked= true;
            e.preventDefault();
            e.stopPropagation();
                var newRequest = {
                notes: $("#requestForm #notes").val(),
                postID: postID
            };

            makeRequest(CREATE_REQUEST, POST, JSON.stringify(newRequest), APPLICATION_JSON, function(data){
                clicked = false;
                $("#formModal").modal("hide");
                getPosts(postID);
                
            }, savePostErrorHandler);
        });
    var requestForm = "<form>"+
        "<label for='txtRequestNotes'>Notes:</label>" +
        "<textarea id='txtRequestNotes' class='form-control'></textarea>" +
        "</form>"        
    $("#formModal .modal-body").html(requestForm);
    $("txtRequestNotes").html("");
    $("#formModal").modal();
}
function savePostErrorHandler(error){
    $("#formModal").modal("hide");
    var errorMsg = error.responseJSON.message.replace(";", "</br>");
    if(errorMsg.indexOf("brij_exception") !== -1){

        errorMsg = errorMsg.replace("brij_exception", "");
        displayError($("#postForm"), errorMsg);
    }

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
    $("#starDiv").html(starDiv);
    var wordUser = "users";
    if(noOfRatings === 1){
        wordUser = "user";
    }
    $("#ratingInfo").html(avgRate + " out of 5 - " + noOfRatings + " " + wordUser);
}

function populatePost(data) {
    post = data.posting;
    id = data.posting.id;
    populateUserInfo(data.posting.user);
    $("#postName").html(data.posting.title);
    $("#postForm #title").val(data.posting.title);
    $("#postForm #serviceName").val(data.serviceName);
    $("#postForm #description").val(data.posting.details);
    fillRating(data.posting.ratings, data.avgRate);
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