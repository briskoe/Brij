var postID;
var requestID;
var isSavingRequest = false;
var conversationTimer;
var openConvo = false;
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

    $("#btnOpenConvo").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        requestConversation();
        conversationTimer = setInterval(requestConversation, 50000);
    });
    
    $("#btnSaveMessage").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        var url = SAVE_MESSAGE;
        url = url.replace(":id", requestID);
        var message = {
            "message": $("#txtaComment").val()
        }
        makeRequest(url, POST, JSON.stringify(message), APPLICATION_JSON, function(data){
            $("#txtaComment").val("");
            requestConversation();
        }, null);
    })
    
    $( window ).resize(function() {
        $("#chatRoomModal #modalBody").css({"height": $(window).height() - 200});
    });
    
    getRequest($.urlParam("id"));
    openConvo = $.urlParam("openConvo");
    

});

function requestConversation(){
    var url = GET_CONVERSATION_BY_REQUEST;
    url = url.replace(":id", requestID);
    makeRequest(url, GET, "", "", openConversation, null);
}
function openConversation(data){
    var conversation = data.conversation;
    var currentUser = data.currentUser;
    var body = createMessagesDiv(conversation.messages, currentUser);
    $("#chatRoomModal #modalTitle").html(conversation.title);
    $("#chatRoomModal #modalBody").css({"height": $(window).height() - 200});
    $("#chatRoomModal #modalBody").scrollTop($("#chatRoomModal #modalBody").scrollHeight);
    $("#chatRoomModal #modalBody").html(body);
    $("#chatRoomModal").modal();
    
    $('#chatRoomModal').on('hidden.bs.modal', function () {
        clearInterval(conversationTimer);    
    })
}



function createMessagesDiv(messages, currentUser){
    var div = "<div id='messageDiv' class='clearfix'>";
    for(var i = 0; i < messages.length; i++){
        var username = messages[i].username;
        var message = messages[i].message;
        var date = messages[i].date;
        var correspondingClass = "";
        var addressUser = "";
        if(username === currentUser){
            correspondingClass = "bg-success pull-right text-right"
            addressUser = "You:";
        }else{
            correspondingClass = "pull-sm-left"
            addressUser = username + ":";
        }
        
        div += "<div class='individualMessage "+ correspondingClass+"'> <span class='chatUser'>"+addressUser+"</span> <p class='message'>"+message+"<br><span class='date'>"+new Date(date).toLocaleString()+"</span></p> </div>";
        //add a clearfix div to put an space between both conversations
        div += "<div class='clearfix'></div>"
    }
    
    div += "</div>";
    return div;
    
}

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
    requestID = data.request.requestID;
    console.log(requestID);
    $("#postName").html(data.posting.title);
    if (data.posting.isPost) {
        $("#requestType").html("You have requested this service");
    } else {
        $("#requestType").html("You have requested to perform this service");
    }
    $("#service").val(data.serviceName);
    $("#description").val(data.posting.details);
    $("#notes").val(data.request.notes);
    if(openConvo){
        requestConversation();
        conversationTimer = setInterval(requestConversation, 50000);
    }
}