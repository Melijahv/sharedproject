document.addEventListener("click", function(evnt){
  console.log(evnt.target.id);
  searchType(evnt.target.id);
});


function searchType(urlObj) {
	switch (urlObj)
	{
	case "search":
		    startSearch();
    break
	case "genre":
		    var genreUrl = `https://streaming-availability.p.rapidapi.com/get/basic?country=us&genres=18`;
        searchMovie(genreUrl);
		break
	default:
		//alert("Suit yourself then...");
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
            
            cardGenerator(data)
            
 
        });

}
function cardGenerator(movieObj) {
  console.log(movieObj);
  //Setting up variables based on incoming Object Data;
  var movieTitle = movieObj.title;
  var moviePlot = movieObj.overview;
  var movieYear = movieObj.year;
  var moviePoster = movieObj.posterURLs.original;
  //var movieCast = movieObj.cast;
  //var moviePosterThumb = movieObj.posterURLs["92"];

  //Since there are multiple streaing option this lists them all with links
  var stream = movieObj.streamingInfo;
  var streamInfo = "";
  for (var i = 0; i < Object.keys(stream).length; i++) {
      var service = Object.keys(stream)[i];

      var streamLink = stream[Object.keys(stream)[i]].us.link;
      var streamInfoItem = `<a href="${streamLink}">${service}</a>`;

      streamInfo = streamInfo + streamInfoItem;
  }
  var displayCard =  `
                      <div class="card">
                      <h2 class="movieTitle">${movieTitle}</h2>
                      <img class ="moviePoster"src="${moviePoster}">
                      <h3 class = "movieYear">${movieYear}</h3>
                      <p class = "moviePlot">${moviePlot}</p>
                      <p class = "streamInfo">${streamInfo}</p>
                      </div>`;


  $(".cardHolder").append(displayCard);

  


}