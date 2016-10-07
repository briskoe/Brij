var postID;
var isDisabled = true;

$(function() {
    
    makeRequest(GET_ALL_SERVICES, GET, "", "", populateServices, null);
    
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
    
    $("#btnEdit").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		isDisabled = !isDisabled;
		$("#postForm .postinput").attr("disabled", isDisabled);
		if(isDisabled){
            savePost();
			$("#btnEdit").html("Edit");
			$("#btnCancel").addClass("hide");
		}else{
            $("#btnEdit").html("Save");
			$("#btnCancel").removeClass("hide");
		}
    });
    
     $("#btnCancel").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		isDisabled = !isDisabled;
		$("#postForm .postinput").attr("disabled", isDisabled);

		if(isDisabled){
			$("#btnEdit").html("Edit");
			$("#btnCancel").addClass("hide");
		}else{
            $("#btnEdit").html("Save");
			$("#btnCancel").removeClass("hide");			
		}
     });
    
    

    getPosts($.urlParam("id"));

});
         
     function savePost(){
		var updatePost = {
            id:postID,
			title: $("#postForm #title" ).val(),
            servID: $("#postForm #serviceDropdown").val(),
			//service: $("#postForm #service" ).val(),
			details: $("#postForm #description" ).val()
        };
         
         console.log($("#postForm #serviceDropdown").val());
        
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
        console.log(id);
}

    function populatePost(data) {
        id = data.posting.id;
        $("#postForm #title").val(data.posting.title);
        $("#postForm #serviceDropdown").val(data.posting.servID);
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

    function populateServices(data) {

        var options;

        for (var i = 0; i < data.length; i++) {
            options += "<option value='" + data[i].id + "'>" + data[i].serviceName + "</option>"    
        }

        $("#serviceDropdown").html(options);
}