// Array holding TV Shows
var shows = ["Game of Thrones", "Parks and Recreation", "Handmaid's Tale", "Stranger Things", "Friends", "Broad City", "WestWorld", "Brooklyn 99", "Grey's Anatomy", "This is Us", "The Office", "Breaking Bad", "Schitt's Creek", " The Marvelous Mrs. Maisel", "The Wire", "Superstore"];

// Function for displaying BUTTONS
function renderButtons() {

  // Deleting the buttons prior to adding new buttons
  $("#buttons-view").empty();
  // Looping through the array ofshows
  for (var i = 0; i < shows.length; i++) {

    // Then dynamicaly generating buttons for each show in the array
    var a = $("<button>");
    // Adding a class of show-btn to our button
    a.addClass("show-btn");
    // Adding a data-attribute
    a.attr("data-name", shows[i]);
    // Providing the initial button text
    a.text(shows[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function adds user input to the array
$("#add-show").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var show = $("#show-input").val().trim();

  // Adding show from the textbox to our array
  shows.push(show);

  // Calling renderButtons which handles the processing of our show array
  renderButtons();
});

// Calling the renderButtons function to display the intial buttons
renderButtons();

//Click event to display gifs and ratings
$("button").on("click", function() {

var show = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=iHAQpMRezwhXoESrTCCVrnMvoZFSbLkL&limit=10";

// Creating an AJAX call for the specific show button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
        console.log("HI");
        console.log(response.data);

        var results = response.data;
      // Creating a div to hold the show gifs
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var showImage = $("<img>");
        showImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(showImage);

        $("#gifs-view").prepend(gifDiv);
      } 
    });

})