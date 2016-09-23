
$(function(){
	$("#btnSave").click(function (e) {
		e.preventDefault();
		e.stopPropagation();
		savePost();
	});

	$("#btnCancel").click(function (e) {
		e.preventDefault();
		e.stopPropagation();
		window.location.href = "postings.html";

	});
});



function savePost() {
    var newPost = {
        name: $("#postForm #title").val(),
        servID: $("#postForm #service").val(),
        price: $("#postForm #cost").val(),
        startDate: $("#postForm #startDate").val(),
        endDate: $("#postForm #endDate").val(),
        startTime: $("#postForm #startTime").val(),
        endTime: $("#postForm #endTime").val(),
		details: $("#postForm #description").val()
		
    };

    makeRequest(CREATE_POST, POST, JSON.stringify(newPost), APPLICATION_JSON, savePostingComplete, null);
}

function savePostingComplete(){
	window.location.href = "postings.html";
}