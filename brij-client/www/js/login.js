/**
 *  Javascript meant for login
 */

$(function () {
    checkIfOnline(checkIfOnlineCallback, false);
    $("#btnSignIn").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var username = $("#loginForm #username").val();
        var password = $("#loginForm #password").val();
        var url = LOGIN;
        url = url.replace(":username", username).replace(":password", password);
        makeRequest(url, POST, "", "", function (data) {
            //if online go to the homePage as you have permission
            checkIfOnline(checkIfOnlineCallback, false);

        }, defaultError);

    });

    $("#btnRegistration").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#registerModal").modal('show');

    });

    $("#btnRegister").click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var newUser = {
            username: $("#registerForm #username").val(),
            password: $("#registerForm #password").val(),
            email: $("#registerForm #email").val()
        };

        makeRequest(REGISTER_USER, POST, JSON.stringify(newUser), APPLICATION_JSON, saveUserComplete, errorSavingUser);

    });

    function goToHome() {
        window.location = "postings.html";
    }

    function checkIfOnlineCallback(data) {
        if (data) {
            goToHome();
        }
    }

});

function saveUserComplete(data) {
    $("#registerModal").modal('show');

    alert("User Created!");
}

function errorSavingUser(date) {
    alert(data.toString);
}