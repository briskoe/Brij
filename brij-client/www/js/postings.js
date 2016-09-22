$(function () {

    loadInfo(refreshForm)

    $("#btnEdit").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        isSavingUser = !isSavingUser;
        $("#userForm input").attr("disabled", !isSavingUser);
        if (isSavingUser) {
            $("#btnEdit").html("Save");
            $("#btnCancel").removeClass("hide");
        } else {
            $("#btnEdit").html("Edit");
            $("#btnCancel").addClass("hide");
            saveUser();
        }
    });

    $("#btnCancel").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        //when user clicks cancel, save changes to edit
        isSavingUser = false;
        $("#userForm input").attr("disabled", true);

        //hiding button
        $("#btnCancel").addClass("hide");

        //change name
        $("#btnEdit").html("Edit");
        loadInfo(refreshForm)


    });

});


function refreshForm(data) {
    console.log(data);
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

function loadInfo(callback) {
    makeRequest(GET_CURRENT_USER, GET, "", APPLICATION_JSON, callback, null);
}