var shows = ["New Girl", "Parks and Rec", "The Good Place"];


//renders buttons
function renderButtons() {
    $("#buttons").empty();

    for(var i = 0; i < shows.length; i++) {
        var a = $("<button>");

        a.addClass("show btn btn-secondary");

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

    //ajax call to API
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var results = response.data;

        //loop through results from API 
        for(var j = 0; j < results.length; j++) {
            
            //if the rating on the result isn't R or PG-13 create the elements to display the gif on the page
            if(results[j].rating !== "r" && results[j].rating !== "pg-13") {

                //create div to hold the gifs
                var gifDiv = $("<div class='item'>");

                //variable to hold the gif rating
                var rating = results[j].rating
                
                //create p element to display rating on page
                var p = $("<p>").text("Rating: " + rating);

                //create an image tag to hold image
                var showImage = $("<img>");

                //add a class and data attributes to the img tag. includes data elements make pausing and unpausing the gif possible
                showImage.addClass("gif");
                showImage.attr("src", results[j].images.fixed_height_still.url)
                showImage.attr("data-still", results[j].images.fixed_height_still.url)
                showImage.attr("data-animate", results[j].images.fixed_height.url)
                showImage.attr("data-state", "still");

                //append the p and img tags to the gif div
                gifDiv.append(showImage);
                gifDiv.append(p);

                //prepend the gif div to the display div in the html
                $("#gifDisplay").prepend(gifDiv);
            }  
        }

        //click event that pauses and unpauses the gif when you click on the image
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

//click event for the buttons
$(document).on("click", ".show", displayShowGifs);

//run function to render buttons on initial page load
renderButtons();


