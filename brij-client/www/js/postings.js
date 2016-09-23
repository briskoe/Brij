$(function () {
	
	makeRequest(GET_POSTS, GET, "", "", createPostingList, null);
	
	
    $("#btnEdit").click(function (e) {

    });

    $("#btnCancel").click(function (e) {



    });

	function createPostingList(data){
		var listItems = "";
		for(var i = 0 ; i < data.length && i < 10; i++){
			if(i % 2 === 0){
				listItems += "<a href='#' class='list-group-item' " + data[i].id + ">" + data[i].name + "</a>";
			}else{
				listItems += "<a href='#' class='list-group-item list-group-item-info'>" + data[i].name + "</a>";
			}
		}
		$("#postingList").html(listItems);
	}
	
	$(".list-group-item").click(function (e) {
		e.preventDefault();
		e.stopPropagation();
		//identify list item id and redirect to post page
        window.location.href = "post.html?id=1";
	});
    
});
