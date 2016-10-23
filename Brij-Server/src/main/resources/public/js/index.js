var loading = {
	show : function() {
		if (!$("#loadingDiv").length) {
			$(
					"<div id='loadingDiv'><h3>Loading<br><span class='glyphicon glyphicon-refresh gly-ani'></span></h3> </div>")
					.css({
						display : "block",
						opacity : 0.90,
						position : "fixed",
						padding : "7px",
						"text-align" : "center",
						background : "black",
						color : "white",
						width : "270px",
						left : ($(window).width() - 284) / 2,
						top : $(window).height() / 2
					}).appendTo($("body"));
		}

	},
	end : function() {
		$("#loadingDiv").fadeOut("slow", function() {
			this.remove();
		})
	}

};
$(function() {
	
	var menuDiv = makeMenu();
	$("#wrapper").prepend(menuDiv);
	
	$("#menu-toggle").click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("active");
	});
	
	$("#menuBtnUser").click(function(e){
		goToUser();
	});
	$("#menuBtnPost").click(function(e){
		
	});
	$("#menuBtnService").click(function(e){
		
	});
	$("#menuBtnTicket").click(function(e){
		
	});
	$("#menuBtnPortal").click(function(e){
		
	});
	$("#menuBtnLogout").click(function(e){
		logout(function(e){
			//window.location = "index.html";
		}, null);
	});

});

function makeMenu() {
	var div = "<div id='sidebar-wrapper'>'";
	div += "<ul id='sidebar_menu' class='sidebar-nav'>" +
				"<li class='sidebar-brand'><a id='menu-toggle' href='#'>Brij" +
				"<span id='main_icon' class='glyphicon glyphicon-align-justify'></span></a></li>" +
			"</ul";
	
	div += "<ul class='sidebar-nav' id='sidebar'> " +
		"<li><a href='#' class='menuItem' id='menuBtnUser'> User <span class='glyphicon glyphicon-user'></span></a></li>" +
		"<li><a href='#' class='menuItem' id='menuBtnPost'> Postings <span class='glyphicon glyphicon-book'></span></a></li>" +
		"<li><a href='#' class='menuItem' id='menuBtnService'> Services <span class='glyphicon glyphicon-globe'></span></a></li>" +
		"<li><a href='#' class='menuItem' id='menuBtnTicket'> Ticket <span class='glyphicon glyphicon-tg-large'></span></a></li>" +
		"<li><a href='#' class='menuItem' id='menuBtnPortal'> Web Portal <span class='glyphicon glyphicon-globe'></span></a></li>" +
		"<li><a href='#' class='menuItem' id='menuBtnLogout'> Log-out <span class='glyphicon glyphicon-log-out'></span></a></li>" +
		"</ul> </div>";
	
	div += "<nav class='navbar navbar-inverse mainMenu'>" +
		"<div class='container-fluid'>" +
			"<div class='navbar-header'>" +
				"<a href='#' class='glyphicon glyphicon-user navbar-toggle' id='btnUserAccount'> " +
				"<span id='userName'>Admin</span> </a> " +
			"</div> </div> </div> </nav>";
	return div;
}

function goToUser() {
	window.location = ADMIN_USER_PAGE;
}
