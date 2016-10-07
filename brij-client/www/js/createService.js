var id;

$(function () {
    $("#btnSave").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        saveService();
    });

    $("#btnCancel").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "createPost.html";
    });


});

function saveService() {
    var newService = {
        serviceName: $("#serviceName").val(),
    };

    makeRequest(CREATE_SERVICE, POST, JSON.stringify(newService), APPLICATION_JSON, saveServiceComplete, null);
}

function saveServiceComplete(data) {
    //add successful check
    window.location.href = "createPost.html";
}