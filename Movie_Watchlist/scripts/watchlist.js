const filmContainer = document.querySelector('.film-container')

const watchlistContainer = document.querySelector('.watchlist-container');

const Watchlist = JSON.parse(localStorage.getItem('watchlist'));
let films;

if(Watchlist) {
    films = Object.values(Watchlist);
}



document.addEventListener('click', function(e) {
    films = films.filter(film => film !== e.target.closest('.remove-from-watchlist-btn').dataset.id);
    localStorage.setItem('watchlist', JSON.stringify(films));
    getMovie()
})


if(!Watchlist) {
    filmContainer.insertAdjacentHTML('afterbegin', emptyMssg())
} else {
    getMovie()
}

function getMovie() {
    watchlistContainer.innerHTML = ''
    const film = films;
    if(film.length === 0) {
        filmContainer.insertAdjacentHTML('afterbegin', emptyMssg());
        return
    }

    for(let i = 0; i< film.length; i++) {
        fetch(`http://www.omdbapi.com/?apikey=c3511f72&i=${film[i]}`)
            .then(res => res.json())
            .then(data => watchlistContainer.insertAdjacentHTML('afterbegin', renderMarkUp(data)))
    }
}




function emptyMssg() {
    const html = `
    <div class="empty-watchlist">
        <h2 class="empty-title">Your watchlist is looking a little empty...</h2>
        <a class="empty-mssg" href="index.html"><i class="fa-solid fa-circle-plus" style="color: #ffffff;"></i> Let's add some movies!</a>
    </div>
    `
    return html;
} 


function renderMarkUp(data) {
    document.querySelector('.film-container').innerHTML = '';

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
                    <span class="add-container"><button class="remove-from-watchlist-btn" data-id='${data.imdbID}'><i class="fa-solid fa-circle-minus remove-icon" style="color: #ffffff;"></i></button></i>remove</span>
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