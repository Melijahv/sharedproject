  function startSearch() {
    var movieSearch = $("#search-text-input").val()
        var url = `https://movie-database-imdb-alternative.p.rapidapi.com/?s=${movieSearch}&page=1&r=json`
  

  fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "1f767a4d80msh4c1bd1b569e133bp1a4349jsn2a8fddc8d493",
		"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
  }
	})

  
.then(response => {
	console.log(response);
  return response.json()
})
.then(function(data){
  console.log(data)


})
.catch(err => {
	console.error(err);
});

}
document.getElementById("search").addEventListener("click", startSearch)

