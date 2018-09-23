//initial array of gif search terms
var gifs = ["happy", "sad", "angry", "confused", "excited", "depressed", "sick", "caffeinated", "hungover", "hungry"];

// whe nyou click the search button
$("#add-gif").on("click", function(event) {
    
    // Preventing the page from reloading
    event.preventDefault();

    // grab the input from the textbox
    var gifSearch = $("#gif-input").val().trim();

    // push the search from the textbox to the array
    gifs.push(gifSearch);

    //reset the input to empty
    $("#gif-input").val("");

    // Calling renderButtons
    renderButtons();

    

  });


  // Function for displaying buttons
  function renderButtons() {

    // Delete old buttons
    $("#gifs-view").empty();

    // Looping through the array of gif terms
    for (var i = 0; i < gifs.length; i++) {

      // create buttons for each gif in the array
      var a = $("<button class='mx-2 mt-0 mb-3'>");
      // Adding a class of gif-btn and btn-info to our buttons
      a.addClass("gif-btn btn-info");
      // Adding a data-name
      a.attr("data-name", gifs[i]);
      // Providing the initial button text
      a.text(gifs[i]);
      // Adding the button to the HTML
      $("#gifs-view").append(a);
    }
  }

//when you click any of the gif term buttons
$(document).on("click", ".gif-btn", function() {

    //store the data-name of whickever btn user clicks
    var gifSearchTerm = $(this).attr("data-name");

    // queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mb4yygjFzZGQsA8hC0Y339VyMeSucWD0&q=" + gifSearchTerm + "&limit=5" ;

    //function for retrieving gif data
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
  
      //for loop to create divs for responses
      for (var i = 0; i < 6; i++) {
  
      //create div to hold entire result of one gif
      var gifDiv = $("<div>").prependTo($("#results"));
  
      //create p to hold gif rating
      var gifRating = $("<p>").appendTo(gifDiv);

      //set the gifRating text to the actual gif's rating
      gifRating.text("Rating: " + response.data[i].rating);
  
      //create img html to hold gif
      var gifImg = $("<img class='m-3 gif-img'>").appendTo(gifDiv);
  
      //set gifImg src and data-attrs for still and animated for clicks later
      gifImg
        .attr("src", response.data[i].images.fixed_width_still.url)
        .attr("data-state", "still")
        .attr("data-still", response.data[i].images.fixed_width_still.url)
        .attr("data-animate", response.data[i].images.fixed_width.url);
    }
    });

})

//when you click any of the gif resulting images
$(document).on("click", ".gif-img", function() {

    //store the data-state of the selected image
    var state = $(this).attr("data-state");

    //conditional if the selected state is still
    if (state === "still") {

        //change the gif src to the animated gif
        $(this).attr("src", $(this).attr("data-animate"));
        //change the data state to animated
        $(this).attr("data-state", "animate");

      //or else, make the gifs stop
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
  })

  //initailly render the buttons
  renderButtons();

