// Array holding TV Shows
var shows = ["Game of Thrones", "Parks and Rec", "Handmaid's Tale", "Stranger Things", "Friends", "Broad City", "WestWorld", "Grey's Anatomy", "This is Us", "The Office"];

// Function for displaying BUTTONS
function renderButtons() {

  // Deleting the buttons prior to adding new buttons
  $("#buttons-view").empty();
  // Looping through the array of shows
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

  if (show === "") {
    alert("Must enter text in the box");
    return false;
  }
  // Adding show from the textbox to our array
  shows.push(show);

  // Calling renderButtons which handles the processing of our show array
  renderButtons();
  $("#show-input").val("");
});

// Calling the renderButtons function to display the intial buttons
renderButtons();

//Click event to display gifs and ratings
$("#buttons-view").on("click", "button", function() {

var show = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=iHAQpMRezwhXoESrTCCVrnMvoZFSbLkL&limit=9";

// Creating an AJAX call for the specific show button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
        console.log(response.data);
      $("#gifs-view").empty();
        var results = response.data;
      // Creating a div to hold the show gifs
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        gifDiv.addClass("gifClass")

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var showImage = $("<img>");
        showImage.attr("src", results[i].images.fixed_height_small_still.url);
        showImage.attr("data-still", results[i].images.fixed_height_small_still.url);
        showImage.attr("data-animate", results[i].images.fixed_height_small.url);
        showImage.attr("data-state", "still");
        showImage.addClass("gif");

        gifDiv.prepend(p);
        gifDiv.prepend(showImage);

        $("#gifs-view").prepend(gifDiv);
      } 
    });
})

$("#gifs-view").on("click", ".gif", function() {
  var state = $(this).attr("data-state");
  console.log(state);

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }

  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
})