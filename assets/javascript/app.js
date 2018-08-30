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
    var state = $(this).attr("data-state");

    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var results = response.data;

        for(var j = 0; j < results.length; j++) {
            if(results[j].rating !== "r" && results[j].rating !== "pg-13") {
                var gifDiv = $("<div class='item'>");

                var rating = results[j].rating
                
                var p = $("<p>").text("Rating: " + rating);

                var showImage = $("<img>");

                showImage.attr("src", results[j].images.fixed_height.url)

                gifDiv.append(p);
                gifDiv.append(showImage);

                $("#gifDisplay").prepend(gifDiv);
            }

        }
    })
}

$(document).on("click", ".show", displayShowGifs);

renderButtons();


