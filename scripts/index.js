
function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}

function spinnerMarkUp() {
    const html = '<div class="lds-dual-ring"></div>';
    return html;
}



const Watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];


const filmContainer = document.querySelector('.film-container');

document.getElementById('submit').addEventListener('click', getMovie);

document.addEventListener('click', function(e) {
    if(e.target.classList.contains('add-icon')) {
        const id = e.target.closest('.add-to-watchlist-btn').dataset.id;
        Watchlist.push(id)
        localStorage.setItem('watchlist', JSON.stringify(Watchlist));
        e.target.closest('.add-container').innerHTML = `<span class="add-container"><i class="fa-solid fa-circle-check added-icon" style="color: #ffffff;"></i>added</span>`
    }
})





function userInput() {
    if(document.getElementById('your_input_id').validity.valid){
        const input = document.getElementById('your_input_id').value;
        document.getElementById('your_input_id').value = '';
        return input
    }
}

function getMovie() {
    document.querySelector(".film-container").innerHTML = '';
    document.querySelector('.main-container').innerHTML = spinnerMarkUp();
    const parameter = userInput();
    if(parameter) {
        fetch(`http://www.omdbapi.com/?apikey=c3511f72&s=${parameter}`)
        .then(res =>res.json())
        .then(data => {
            const realData = [];
            data.Search.forEach(mv => mv.Type === "movie" ? realData.push(mv): "");
            return realData;
        }).then(res => {
            for(let i = 0 ; i < res.length; i++) {
                // sendRequest(res[i].imdbID)
                fetch(`http://www.omdbapi.com/?apikey=c3511f72&i=${res[i].imdbID}`)
                .then(res => res.json())
                .then(data => {
                    const url = data.Poster !== 'N/A' ? imageExists(data.Poster) : 'N/A'
                    if(url !== "N/A" && data.Plot !== "N/A" && url !== false) {
                       filmContainer.insertAdjacentHTML('afterbegin', renderMarkUp(data)) 
                    }

                })
            }
        }).catch(err => document.querySelector('.main-container').insertAdjacentHTML('afterbegin', errorMssg()))
    }
}



function renderMarkUp(data) {
    
    
    document.querySelector('.main-container').innerHTML = '';

    const html =  `
    <div class="film">
        <div class="film-info">
            <div class="poster-container">
                <img src="${data.Poster}" alt="${data.Title}-poster" class="poster-img">
            </div>
            <div class="film-more">
                <div class="film-header">
                    <h3 class="film-title">${data.Title}</h3>
                    <span><img src="Icon.svg" alt="star-icon" class="star-icon"></span>
                    <span class="rating">${data.imdbRating}</span>
                </div>
                <div class="film-dur">
                    <span class="duration">${data.Runtime}</span>
                    <span class="genre">${data.Genre}</span>
                    ${renderLogic(data.imdbID)}
                    </div>
                <div class="film-description">
                    <p>${data.Plot}</p>
                </div>
            </div>
        </div>
    </div>
    `

    return html;

}


function renderLogic(id) {
    if(Object.values(Watchlist).includes(id)) {
        return `<span class="add-container"><i class="fa-solid fa-circle-check added-icon" style="color: #ffffff;"></i>added</span>`
    }else {
        return `<span class="add-container"><button class="add-to-watchlist-btn" data-id="${id}"><img src="addToWatchListIcon.svg" alt="addToWatchListIcon" class="add-icon"></button>Watchlist</span>`
    }
}


function errorMssg() {
    document.querySelector('.main-container').innerHTML = '';
    return `
        <div>
            <h2 class = 'empty-title'>Unable to find what you're looking for. Please try another search.</h2>
        <div>
    
    `
}




 // const html = films.map(film => renderMarkUp(film)).join('');
            // filmContainer.insertAdjacentHTML('afterbegin', html);




// {
//     "Title": "Oppenheimer",
//     "Year": "2023",
//     "Rated": "R",
//     "Released": "21 Jul 2023",
//     "Runtime": "180 min",
//     "Genre": "Biography, Drama, History",
//     "Director": "Christopher Nolan",
//     "Writer": "Christopher Nolan, Kai Bird, Martin Sherwin",
//     "Actors": "Cillian Murphy, Emily Blunt, Matt Damon",
//     "Plot": "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
//     "Language": "English, German, Italian",
//     "Country": "United States, United Kingdom",
//     "Awards": "2 wins & 1 nomination",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
//     "Ratings": [
//         {
//             "Source": "Internet Movie Database",
//             "Value": "8.6/10"
//         },
//         {
//             "Source": "Rotten Tomatoes",
//             "Value": "93%"
//         },
//         {
//             "Source": "Metacritic",
//             "Value": "88/100"
//         }
//     ],
//     "Metascore": "88",
//     "imdbRating": "8.6",
//     "imdbVotes": "450,016",
//     "imdbID": "tt15398776",
//     "Type": "movie",
//     "DVD": "N/A",
//     "BoxOffice": "$322,500,125",
//     "Production": "N/A",
//     "Website": "N/A",
//     "Response": "True"
// }








// Movie Poster
// Movie title
// Movie ratings
// Movie RunTime
// Only type movie
// Movie Genre
// Movie Plot


