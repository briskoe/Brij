


var loading = {
    show: function () {
        if (!$("#loadingDiv").length) {
            $("<div id='loadingDiv'><h3>Loading<br><span class='glyphicon glyphicon-refresh gly-ani'></span></h3> </div>")
                .css({
                    display: "block",
                    opacity: 0.90,
                    position: "fixed",
                    padding: "7px",
                    "text-align": "center",
                    background: "black",
                    color: "white",
                    width: "270px",
                    left: ($(window).width() - 284) / 2,
                    top: $(window).height() / 2
                })
                .appendTo($("body"));
        }

    },
    end: function () {
        $("#loadingDiv").fadeOut("slow", function () {
            this.remove();
        })
    }

};