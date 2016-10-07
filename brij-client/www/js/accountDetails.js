/**
 * Javascript meant for accountDetails
 */
//variable that tells if is saving user account
var isSavingUser = false;
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

function saveUser() {
    var updateUser = {
        firstName: $("#userForm #firstName").val(),
        lastName: $("#userForm #lastName").val(),
        phoneNumber: $("#userForm #phoneNumber").val(),
        address: $("#userForm #address").val(),
        city: $("#userForm #city").val(),
        province: $("#userForm #province").val(),
        email: $("#userForm #email").val()
    };

    makeRequest(UPDATE_USER, POST, JSON.stringify(updateUser), APPLICATION_JSON, null, null);
}

function eraseForm() {
    $("#username").html("");
    $("#userForm #firstName").val("");
    $("#userForm #lastName").val("");
    $("#userForm #phoneNumber").val("");
    $("#userForm #address").val("");
    $("#userForm #city").val("");
    $("#userForm #province").val("");
    $("#userForm #email").val("");
}

function recoverStateForm() {
    $("#userForm #firstName").val(user.firstName);
    $("#userForm #lastName").val(user.lastName);
    $("#userForm #phoneNumber").val(user.phoneNumber);
    $("#userForm #address").val(user.address);
    $("#userForm #city").val(user.city);
    $("#userForm #province").val(user.province);
    $("#userForm #email").val(user.email);
}

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