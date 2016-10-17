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

    $("#btnNow").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        completeAccount("Now");
    });

    $("#btnLater").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        completeAccount("Later");
    });

    $("#btnRegister").click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (($("#registerForm #password").val() === $("#registerForm #confirmPassword").val()) && $("#registerForm #password").val().length >= MINIMUM_PASSWORD_LENGTH && $("#registerForm #password").val().length <= MAXIMUM_PASSWORD_LENGTH) {
            var newUser = {
                username: $("#registerForm #username").val(),
                password: $("#registerForm #password").val(),
                email: $("#registerForm #email").val()
            };

            makeRequest(REGISTER_USER, POST, JSON.stringify(newUser), APPLICATION_JSON, saveUserComplete, errorSavingUser);
        } else {
            alert("ADD INFORMATIVE MESSAGE - Passwords do not match");
        }
    });

});

function checkIfOnlineCallback(data) {
    if (data) {
        goToHome("postings.html");
    }
}

function goToHome(where) {
    window.location = where;
}

function completeAccountDetails(data) {
    if (data) {
        goToHome("accountDetails.html");
    }
}

function saveUserComplete() {
    $("#registerModal").modal('hide');
    $("#completeAccountModal").modal('show');

}

function errorSavingUser(data) {
    alert(data.toString);
}

function completeAccount(when) {
    var username = $("#registerForm #username").val();
    var password = $("#registerForm #password").val();
    var callbackLocation = checkIfOnlineCallback;

    var url = LOGIN;
    url = url.replace(":username", username).replace(":password", password);

    if (when === "Now") {
        callbackLocation = completeAccountDetails;
    }

    makeRequest(url, POST, "", "", function (data) {
        //if online go to the homePage as you have permission
        checkIfOnline(callbackLocation, false);
    }, defaultError);


}