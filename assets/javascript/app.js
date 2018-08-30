var shows = ["New Girl", "Parks and Rec", "The Good Place"];


//renders buttons
function renderButtons() {
    $("#buttons").empty();

    for(var i = 0; i < shows.length; i++) {
        var a = $("<button>");

        a.addClass("show");

        a.attr("data-name", shows[i]);

        a.text(shows[i]);

        $("#buttons").append(a);
    }   
}

//add button for a show submitted in the form
    $("#add-show").on("click", function() {
        event.preventDefault();

        var show = $("#show-input").val().trim();

        shows.push(show);
        console.log(shows);

        renderButtons();
        $("#show-input").val("");
    })

//display show gifs
function displayShowGifs() {
    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var results = response.data;

        // var stillImage = ""
        // var animatedImage = ""

        for(var j = 0; j < results.length; j++) {
            if(results[j].rating !== "r" && results[j].rating !== "pg-13") {
                var gifDiv = $("<div class='item'>");

                var rating = results[j].rating
                
                var p = $("<p>").text("Rating: " + rating);

                var showImage = $("<img>");

                // stillImage = results[j].images.fixed_height_still.url
                // animatedImage = results[j].images.fixed_height.url

                showImage.addClass("gif");
                showImage.attr("src", results[j].images.fixed_height_still.url)
                showImage.attr("data-still", results[j].images.fixed_height_still.url)
                showImage.attr("data-animate", results[j].images.fixed_height.url)
                showImage.attr("data-state", "still");


                gifDiv.append(p);
                gifDiv.append(showImage);

                $("#gifDisplay").prepend(gifDiv);
            }

           
        }
        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
        
            if(state === "still") {
                $(this).attr("src",$(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }

        })
    })
}



$(document).on("click", ".show", displayShowGifs);

renderButtons();


