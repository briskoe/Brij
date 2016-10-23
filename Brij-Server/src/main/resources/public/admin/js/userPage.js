/**
 * 
 */

$(function(){
	makeRequest(GET_ALL_USERS, GET, "", "", populateTable, null);
})

function populateTable(data){
	var dir = "";
	for(var i = 0; i < data.length; i++){
		dir += "<tr>";
		dir += "<th>"+data[i].username+"</th>"; 
		dir += "<th>"+data[i].firstName+"</th>"; 
		dir += "<th>"+data[i].lastName+"</th>"; 
		dir += "<th>"+data[i].email+"</th>"; 
		dir += "<th>"+data[i].status+"</th>"; 
		dir += "<th><a>"+data[i].email+"</a></th>"; 


	}
	$("#usersContent").html(dir);
}
