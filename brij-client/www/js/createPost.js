$("#btnSave").click(function (e) {
    savePost();
});

$("#btnCancel").click(function (e) {
    window.location.href = "postings.html";

});


function savePost() {
    var newPost = {
        name: $("#postForm #title").val(),
        servId: $("#postForm #service").val(),
        price: $("#postForm #cost").val(),
        startDate: $("#postForm #startDate").val(),
        endDate: $("#postForm #endDate").val(),
        startTime: $("#postForm #startTime").val(),
        endTime: $("#postForm #endTime").val()
    };

    makeRequest(CREATE_POST, POST, JSON.stringify(newPost), APPLICATION_JSON, null, null);
}