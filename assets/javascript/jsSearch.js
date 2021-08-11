

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

        break
	case "new":
        var newRelease = `https://movie-database-imdb-alternative.p.rapidapi.com/?min_imdb_rating=95&page=1&r=json`
        startSearch(newRelease);
        
		break
    case "popular":
		
        var popularMovies = `https://streaming-availability.p.rapidapi.com/get/basic?country=us`
        startSearch(popularMovies);
        
		break
    case "watchlist":
		    
        
		break
    case "mpaaRating":
		   
        
		break
	default:
		
	}
}



function startSearch(newUrl) {
    
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

