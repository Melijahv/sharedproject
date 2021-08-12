$("#hero-carousel").remove();
var initialMovies = ["tt0111161", "tt4154796", "tt7286456", "tt0068646", "tt0468569", "tt0109830", "tt0993846", "tt0816692", "tt1853728", "tt0133093"];
prelistSearch(initialMovies);

///////////////////////////////  UNIVERSAL EVENT LISTENER     ///////////////////////
document.addEventListener("click", function(evnt){
  console.log(evnt.target.id);
  searchType(evnt.target.id);
});

///////////////////////////// HANDLES BUTTON LOGIC          //////////////////
function searchType(urlObj) {
	switch (urlObj)
	{
	case "search":
        var movieSearch = $("#search-text-input").val()
        var searchUrl = `https://movie-database-imdb-alternative.p.rapidapi.com/?s=${movieSearch}&page=1&r=json`;
        startSearch(searchUrl);
	searchHistory(movieSearch);
        break
	case "new":
            var newMovies = ["tt6264654", "tt2452150", "tt6246322", "tt10366460", "tt8800266", "tt8639136", "tt10832274", "tt12636872"];
            prelistSearch(newMovies)
        
		break
    case "popular":
		
            var popularMovies = ["tt0111161", "tt4154796", "tt7286456", "tt0068646", "tt0468569", "tt0109830", "tt0993846", "tt0816692", "tt1853728", "tt0133093"];
            prelistSearch(popularMovies)
        
		break
    case "watchlist":
		    
        
		break
    case "mpaaRating":
		   
        
		break
	default:
		
	}
}

function prelistSearch(array) {
// 	clears the stage
$('.owl-stage').epmty()
    for (let i = 0; i < array.length; i++) {
        searchMovie("https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=" + array[i]);
    }
}

function startSearch(newUrl) {
//Clears the Stage;	
    $('.owl-stage').epmty();
	
        var url = newUrl
  

  fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "1f767a4d80msh4c1bd1b569e133bp1a4349jsn2a8fddc8d493",
		"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
  }
})
.then(response => {
	
  return response.json()

})
.then(function(data){
  
  for(let i= 0;i<data.Search.length;i++)
  { 
    
    var sUrl = `https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=${data.Search[i].imdbID}`;
    
    searchMovie(sUrl);
  } 
})
.catch(err => {
	console.error(err);
});

}
//////////////////////////////////       GET MOVIE DATA FROM DATABASE      ///////////////////////////////////
function searchMovie(searchResults) {
    

    console.log(searchResults);
    var url = searchResults;

    fetch(url, {
      
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "9d6dc1598cmsh52c69e6dce9a0cap151e7fjsn639987602eaf",
                "x-rapidapi-host": "streaming-availability.p.rapidapi.com",


            }

        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            
            cardGenerator(data);
            
 
        });

}

//////////////////////////////////      TAKE MOVIE DATA OBJECT AND FORMAT THE DISPLAY      ///////////////////////////////////


function cardGenerator(movieObj) {
  
  //Setting up variables based on incoming Object Data;
  var movieTitle       = movieObj.title;
  var moviePlot        = movieObj.overview;
  var movieYear        = movieObj.year;
  var movieRank        = movieObj.imdbRating;
  var movieAge         = movieObj.age;
  var movieRuntime     = movieObj.runtime;
  var moviePoster      = movieObj.posterURLs.original;
  //var movieCast      = movieObj.cast;
  var moviePosterThumb = movieObj.posterURLs["92"];

  //Since there are multiple streaing option this lists them all with links
  var stream = movieObj.streamingInfo;
  var streamInfo = "";
  for (var i = 0; i < Object.keys(stream).length; i++) {
      var service = Object.keys(stream)[i];

      var streamLink = stream[Object.keys(stream)[i]].us.link;
      var streamInfoItem = `<a href="${streamLink}">${service}</a>`;

      streamInfo = streamInfo + streamInfoItem;
  }
  
  
  var html = '';   
let navText = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]  
  var owl = $('#owl-test').owlCarousel({
            items: 1,
            dots: false,
            loop: true,
            nav:true,
            navText: navText,
            autoplay: true,
            autoplayHoverPause: true
		   
		});

//////////////////////////////////       GENERATE THE HTML DYN      ///////////////////////////////////       
    owl.trigger('add.owl.carousel', [jQuery(
     `<div class="hero-slide-item">
    <img class ="loadImageClass" src="${moviePoster}" alt="">
    <div class="overlay"></div>
    <div class="hero-slide-item-content">
        <div class="item-content-wraper">
            <div class="item-content-title top-down">
                ${movieTitle}
            </div>
            <div class="movie-infos top-down delay-2">
                <div class="movie-info">
                    <i class="bx bxs-star"></i>
                    <span>${movieRank}</span>
                </div>
                <div class="movie-info">
                    <i class="bx bxs-time"></i>
                    <span>${movieRuntime}</span>
                </div>
                <div class="movie-info">
                    <span>${movieTitle}</span>
                </div>
                <div class="movie-info">
                    <span>${movieAge}</span>
                </div>
                <div class="movie-info">
                <span class = "streamInfo">${streamInfo}</span>
            </div>
            </div>
            <div class="item-content-description top-down delay-4">
                ${moviePlot}
            </div>
        </div>
    </div>
</div>`)]);
	
			owl.trigger('refresh.owl.carousel');
			
}

//Search History Funtion
//Save's history as additonal data in the searchbar
function searchHistory(searchItem) {
    var history = localStorage.getItem("searchHistory")
        //Check if there's existing history
    if (history === null) {
        //If there's no exisiting history, make a new blank entry
        localStorage.setItem("searchHistory", "")
    }
    if (!history.includes(searchItem)) {
        history = "<option>" + searchItem + "</option>" + history;
    }
    //Save it to local storage
    localStorage.setItem("searchHistory", history)
        //pull newly updated version from local storage
    var historyList = localStorage.getItem("searchHistory")
        //Clear out whatever's there in history to begin with
    $("#search-history").empty();
    //Add the new search history list
    $("#search-history").append(historyList)
    console.log(historyList);
}
