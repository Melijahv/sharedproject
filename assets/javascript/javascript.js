//test code still in progress feel free to edit.



var issueContainer = document.getElementById('holder');
var fetchButton = document.getElementById('fetch-button');
fetchButton.addEventListener('click', getApi);


function getApi() {
    var url = "https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=series&genre=18&page=10&language=en";

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
            

            for (var i = 0; i < data.results.length; i++) {
                cardGenerator(data.results[i])
            }
 
        });

}

fetchButton.addEventListener('click', getApi);

//Card Generator
function cardGenerator(movieObj) {
    
    //Setting up variables based on incoming Object Data
    var movieTitle = movieObj.title
    var moviePlot = movieObj.overview
    var movieYear = movieObj.year
    var moviePoster = movieObj.posterURLs.original;
    //var movieCast = movieObj.cast
    //var moviePosterThumb = movieObj.posterURLs["92"]

    //Since there are multiple streaing option this lists them all with links
    var stream = movieObj.streamingInfo
    var streamInfo = ""
    for (var i = 0; i < Object.keys(stream).length; i++) {
        var service = Object.keys(stream)[i];

        var streamLink = stream[Object.keys(stream)[i]].us.link;
        var streamInfoItem = `<a href="${streamLink}">${service}</a>`;

        streamInfo = streamInfo + streamInfoItem;
    }
    var displayCard =  `<div class="card">
                        <h2 class="title">${movieTitle}</h2>
                        <img src="${moviePoster}">
                        <h3>${movieYear}</h3>
                        <p>${moviePlot}</p>
                        <p>${streamInfo}</p>
                        </div>`


    $(".card-area").append(displayCard);
}