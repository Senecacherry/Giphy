

$(document).ready(function(){

   //per the instructions I am creating a array with topics related to AHS. The string is empty because that's where the gifs will go.
    var show = ["American Horror Story Witches", "AHS Apocalypse", "Evan Peters", "AHS Roanoke", "Murder House", "Sarah Paulson", "Jessica Lange", "Kathy Bates", "Emma Roberts", "Taissa Farmiga", "Adina Porter", "AHS Cults"]
    GIFArea = " "
    
  //----------------------------------------------------------------//  
    
    //function for displaying tv show data
    function renderButtons() {
    
    //deleting the show buttons prior to adding new show buttons
    $("#show-view").empty();
    
    //creating the loop that goes through my tv show-topics array
    for (var i=0; i < show.length; i++) {
    
    //adding buttons for each show in the array.
    //Using jquery with the carrots means create a new whatever is inside the quotes. In this case I am using it to create the start and end tag for a button. 
    var nS = $("<button>");
    //adding a class
    nS.addClass("shows");
    
    //adding a data-attribute with a value of the show at index i
    nS.attr("data-name", show[i]);
    //providing the button's text with a value of the show at index i
    nS.text(show[i]);
    //adding the button to the html
    $("#show-view").append(nS);
    }
    nS=
    $("#show-input").focus();
    
    }
    
    renderButtons();
    //-----------------------------------//
    //this function handles events when one button is clicked
    $("#add-show").on("click", function() {
    
    //event.preventDefault() prevents the form from trying to submit itself (had to do some research on this one. Was still a little confused after class)
    event.preventDefault();
    
    //This line I will grab the text from the input box
    var shows = $("#show-input").val().trim();
    
    //this pushes the show into my array
    show.push(shows);
    
    // processing of my show array
    renderButtons();
    
    });
    
    //--------------------------------------------------------------//
    $(document).on("click", "button",  function() {
        // Deleting the shows prior to adding new shows
        // (this is necessary otherwise I  will have repeat buttons)
        $("#GIFArea").empty(); 
            var gifs = $(this).attr("data-name");		// 'this' refers to the button that was clicked
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=GLdEXCfLHfS3LiAYstroDzkrXPTX0JK7&limit=16";  //query api url and public key
            console.log(queryURL); 
    
        //ajax call to get request
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        //after the data comes back from the API
            .done(function(response) {
            console.log(response);
        //Storing an array of results in the results variable
            var results = response.data;
        //Looping over every result item
        for (var i = 0; i < results.length; i++) {
        //creating a div with the class item
            var gifDiv = $('<div class="item">');
        //storing the result items rating        
            var rating = results[i].rating;
        //creating an element to have the rating displayed
            var r = $("<p>").text("Rating: " + rating);
        //creating a image tag
            var gifImage = $("<img>");
        //giving the image tag an src attribute of a property pulled from the result item
            gifImage.attr("src", results[i].images.fixed_height_still.url)
                .attr("data-still", results[i].images.fixed_height_still.url)
                .attr("data-animate", results[i].images.fixed_height.url)
                .attr("data-state", "still")
                .addClass("showImage");
        //displaying the rating & image
            gifDiv.append(r)
                .append(gifImage);	                    
    
                  	  
            $("#GIFArea").prepend(gifDiv);
        }
    
        });
        });
    
    
   //---------------------------------------------------------//
        // Making gifs dynamic by listening for click
        // $('.showImage').on('click', function(){ --> won't work here
        $(document).on("click", ".showImage",  function() {
    
            var state = $(this).data("state");
            //If the clicked image's state is still, update its src attribute to what its data-animate value is
            if (state == "still") {
                console.log("still image works");
             // Then, set the image's data-state to animate
                $(this).attr('src', $(this).data('animate'))
                       .data('state', 'animate');
            } else {
            //  else set src to the data-still value
                console.log("animated image works");
                $(this).attr('src', $(this).data('still'))
                       .data('state', 'still');               
            }
    
        });
    
    });
    