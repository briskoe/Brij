
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
        title: $("#postForm #title").val(),
        servID: $("#postForm #service").val(),
		details: $("#postForm #description").val(),
        isPost: $("input:radio[name='rdIsPost']:checked").val()
		
    };

    makeRequest(CREATE_POST, POST, JSON.stringify(newPost), APPLICATION_JSON, savePostingComplete, null);
}

function savePostingComplete(){
	window.location.href = "postings.html";
}