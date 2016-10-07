$(function () {
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

    $("#serviceDropdown").change(function () {
        if ($("#serviceDropdown").val() === "create") {
            createService();
        }
    });

    makeRequest(GET_ALL_SERVICES, GET, "", "", populateServices, null);
});



function savePost() {
    var newPost = {
        title: $("#postForm #title").val(),
        servID: $("#postForm #serviceDropdown").val(),
        details: $("#postForm #description").val(),
        isPost: $("input:radio[name='rdIsPost']:checked").val()

    };

    makeRequest(SAVE_POST, POST, JSON.stringify(newPost), APPLICATION_JSON, savePostingComplete, null);
}

function savePostingComplete() {
    window.location.href = "postings.html";
}

function populateServices(data) {

    var options;

    for (var i = 0; i < data.length; i++) {
        options += "<option value='" + data[i].id + "'>" + data[i].serviceName + "</option>"
    }

    $("#serviceDropdown").html(options);
    options = "<option value='create'>Create New Service</option>"
    $("#serviceDropdown").prepend(options);
}

function createService() {
    window.location.href = "createService.html";
}