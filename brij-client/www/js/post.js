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



    function requestService() {
        //Request object to be built and pass to proper page here
        window.location.href = "postings.html";
    }
});

function getPosts(id) {
    //Need to get based on id
    var url = GET_POST_BY_ID;
    url = url.replace(":id", id);
    makeRequest(url, GET, "", "", populatePost, null);
    console.log(id);
}

var serviceArray = [
	"Cleaning", "Dog Walking", "Gardening", "Snow Shoveling", "Tutoring"
];

function populatePost(data) {
    console.log(data.endTime);
    $("#postForm #title").val(data.title);
    $("#postForm #service").val(serviceArray[data.servID]);
    $("#postForm #description").val(data.details);
    var messageInfo = "";
    
    if(data.isPost){
        messageInfo = IS_POSTING_MESSAGE_FOR_OTHERS;
    }else{
        messageInfo = IS_REQUEST_MESSAGE_FOR_OTHERS;
    }
    
    $("#isPostDiv").html(messageInfo);
}