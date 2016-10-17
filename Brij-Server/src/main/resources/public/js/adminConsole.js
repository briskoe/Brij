/**
 * 
 */

$(function(){
	$("#menu-toggle").click(function(e) {
		e.preventDefault();
		console.log("As")
		$("#wrapper").toggleClass("active");
	});
})
