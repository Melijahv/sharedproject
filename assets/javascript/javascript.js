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

  fetchButton.addEventListener('click', getApi);
