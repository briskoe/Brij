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



    /* var query_string = {};
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
     */
    getPosts($.urlParam("id"));



    function requestService() {
        //Request object to be built and pass to proper page here
        window.location.href = "postings.html";
    }
});

function getPosts(id) {
    //Need to get based on id
    var url = GET_POST_BY_ID;
    url = url.replace(":id", id);
    makeRequest(url, GET, "", "", populatePost, null);
    console.log(id);
}

var serviceArray = [
	"Cleaning", "Dog Walking", "Gardening", "Snow Shoveling", "Tutoring"
];

function populatePost(data) {
    console.log(data.endTime);
    $("#postForm #title").val(data.name);
    $("#postForm #service").val(serviceArray[data.servID]);
    $("#postForm #description").val(data.details);
    $("#postForm #startDate").val(data.startDate);
    $("#postForm #endDate").val(data.endDate);
    $("#postForm #startTime").val(data.startTime);
    $("#postForm #endTime").val(data.endTime);
    $("#postForm #cost").val(data.price);

}