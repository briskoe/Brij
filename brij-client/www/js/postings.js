$(function () {


    getAllPosts();
    $("#btnEdit").click(function (e) {

    });

    $("#btnCancel").click(function (e) {



    });

    function getAllPosts() {
        makeRequest(GET_POSTS, GET, "", "", createPostingList, null);

    }

    function createPostingList(data) {
        var listItems = "";
        for (var i = 0; i < data.length && i < 10; i++) {
                var badge = "REQUEST"
                console.log(data[i].isPost);
                if(data[i].isPost){
                    badge = "POSTING";
                }
            if (i % 2 === 0) {
                listItems += "<a href='post.html?id=" + data[i].id + "' class='list-group-item' id='posting#" + data[i].id + "'> <span class='badge'>"+ badge +"</span> " + data[i].title + "</a>";
            } else {
                listItems += "<a href='post.html?id=" + data[i].id + "' class='list-group-item list-group-item-info' id='posting#" + data[i].id + "'>" + "<span class='badge'>"+ badge +"</span>" + data[i].title + "</a>";
            }
        }
        $("#postingList").html(listItems);
    }
    $("#btnAll").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".btnPosts").removeClass("active");
        $("#btnAll").addClass("active");

        getAllPosts();
    });


    $("#btnMyPosts").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".btnPosts").removeClass("active");
        $("#btnMyPosts").addClass("active");
        makeRequest(GET_MY_POSTS, GET, "", "", createPostingList, null);
    });

});