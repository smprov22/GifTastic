// Array holding TV Shows
var shows = ["Game of Thrones", "Parks and Recreation", "Handmaid's Tale", "Stranger Things", "Friends", "Broad City", "WestWorld", "Brooklyn 99", "Grey's Anatomy", "This is Us", "The Office", "Breaking Bad", "Schitt's Creek", " The Marvelous Mrs. Maisel", "The Wire", "Superstore"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayShowInfo() {

        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=iHAQpMRezwhXoESrTCCVrnMvoZFSbLkL&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            var results = response.data;
          // Creating a div to hold the movie
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-view").prepend(gifDiv);
          } 
        });

      }

      // Function for displaying gifs
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < shows.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("show-btn");
          // Adding a data-attribute
          a.attr("data-name", shows[i]);
          // Providing the initial button text
          a.text(shows[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a show button is clicked
      $("#add-show").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var show = $("#show-input").val().trim();

        // Adding show from the textbox to our array
        shows.push(show);

        // Calling renderButtons which handles the processing of our show array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "show-btn"
      $(document).on("click", ".movie-btn", displayShowInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();