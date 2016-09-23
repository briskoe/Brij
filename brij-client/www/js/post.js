$(function () {
    $("#btnBack").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "postings.html";

    });

    $("#btnRequest").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        requestService();
    });



    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);


        }
    }
    console.log(query_string);
    
    getPosts(query_string.id);
    
    

    function requestService() {
        //Request object to be built and pass to proper page here
        window.location.href = "postings.html";
    }
});

function getPosts(var id) {
    //Need to get based on id
    makeRequest(GET_POST, GET, "", "", createPostingList, null);
    console.log(id);
}