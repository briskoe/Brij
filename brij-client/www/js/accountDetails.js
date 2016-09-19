/**
* Javascript meant for accountDetails
*/
//variable that tells if is saving user account
var isSavingUser = false;
$(function(){

	loadInfo(function(data){
		console.log("a");
		console.log(data);
	});
	
	$("#btnEdit").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		isSavingUser = !isSavingUser;
		$("#userForm input").attr("disabled", !isSavingUser);
		if(isSavingUser){
			$("#btnEdit").html("Save");
			$("#btnCancel").removeClass("hide");
		}else{
			$("#btnEdit").html("Edit");
			$("#btnCancel").addClass("hide");

		}
		
		
	});
	
	
	
	$("#btnCancel").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		//when user clicks cancel, save changes to edit
		isSavingUser = false;
		$("#userForm input").attr("disabled", true);
		
		//hiding button
		$("#btnCancel").addClass("hide");
		
		//change name
		$("#btnEdit").html("Edit");
		
	});


	function loadInfo(callback){
		console.log(callback);
		makeRequest(GET_CURRENT_USER, GET, "", APPLICATION_JSON, callback, null);
	}
});