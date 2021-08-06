//test code still in progress feel free to edit.



var issueContainer = document.getElementById('holder');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
var url = "https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=series&genre=18&page=10&language=en";

fetch(url, {
	"method": "GET",
  	"headers": {
		"x-rapidapi-key": "9d6dc1598cmsh52c69e6dce9a0cap151e7fjsn639987602eaf",
		"x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    
    
  }
  
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    
    
    
    for (var i = 0; i < data.results.length; i++) {
    
    
      var title = document.createElement('h3');
      var released = document.createElement('p');
      var thumbImage = document.createElement('img');
        
      title.textContent = data.results[i].title;
      released.textContent = data.results[i].firstAirYear;
      thumbImage.src = data.results[i].posterURLs[92];
      
      issueContainer.append(title);
      issueContainer.append(released);
      issueContainer.append(thumbImage);
    }
    
  });
}

  // fetchButton.addEventListener('click', getApi);

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
  var movie = []
for (let i = 0; i < data.Search.length; i++) {
  const element = data.Search[i];
  console.log(data.Search[i].imdbID)
  movie.push(data.Search[i].imdbID)

}

console.log(movie)

})
.catch(err => {
	console.error(err);
});
}

document.getElementById("search").addEventListener("click", startSearch)

async function asyncCall() {
  console.log('calling');
  const result = await getApi();
  console.log(result);
  // expected output: "resolved"
}
asyncCall();