

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
		
        startSearch();
        break
	case "new":
        var newRelease = `https://streaming-availability.p.rapidapi.com/get/basic?country=us`
        searchMovie(newRelease);
        alert(urlObj);
		break
    case "popular":
		
        var popularMovies = `https://streaming-availability.p.rapidapi.com/get/basic?country=us`
        searchMovie(popularMovies);
        alert(urlObj);
		break
    case "watchlist":
		    
        alert(urlObj);
		break
    case "mpaaRating":
		   
        alert(urlObj);
		break
	default:
		
	}
}



function startSearch() {
    var movieSearch = $("#search-text-input").val()
        var url = `https://movie-database-imdb-alternative.p.rapidapi.com/?s=${movieSearch}&page=1&r=json`;
  

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
    //searchMovie(data.Search[i].imdbID);
    searchMovie(sUrl);
  } 
})
.catch(err => {
	console.error(err);
});

}
//////////////////////////////////       GET MOVIE DATA FROM DATABASE      ///////////////////////////////////
function searchMovie(searchResults) {
    
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
            console.log(data);
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
		var owl = $('#owl-test').owlCarousel({
		    loop:true,
		    smartSpeed: 100,
		    autoplay: true,
		    autoplaySpeed: 100,
		    mouseDrag: false,
		    margin:10,
		    animateIn: 'slideInUp',
		    animateOut: 'fadeOut',
		    nav:false,
		    responsive:{
		        0:{
		            items:1
		        },
		        600:{
		            items:1
		        },
		        1000:{
		            items:1
		        }
		    }
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
            </div>
            <div class="item-content-description top-down delay-4">
                ${moviePlot}
            </div>
        </div>
    </div>
</div>`)]);
	
			owl.trigger('refresh.owl.carousel');
			
}

