/**
*  Javascript meant for login
*/

$(function(){
	checkIfOnline(checkIfOnlineCallback, false);
	$("#btnSignIn").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var username = $("#loginForm #username").val();
		var password = $("#loginForm #password").val();
		var url = LOGIN;
		url = url.replace(":username", username).replace(":password", password);
		makeRequest(url, POST, "", "", function(data){
			//if online go to the homePage as you have permission
			checkIfOnline(checkIfOnlineCallback, false);

		}, defaultError);
		
	});

	function goToHome(){
		window.location = "postings.html";
	}
	function checkIfOnlineCallback(data){
		if(data){
			goToHome();
		}
	}
	
});