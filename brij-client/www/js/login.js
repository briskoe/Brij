/**
*  Javascript meant for login
*/

$(function(){
	checkIfOnline(function(){window.location = "postings.html"}, false);
	$("#btnSignIn").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var username = $("#loginForm #username").val();
		var password = $("#loginForm #password").val();
		var url = LOGIN;
		url = url.replace(":username", username).replace(":password", password);
		makeRequest(url, POST, "", "", function(data){
			console.log("successful Login");
			window.location = "postings.html";
		}, defaultError);
		
	});

	
	
});