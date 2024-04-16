const apiKey = 'c981f6a';

let nameMovie = localStorage.getItem('name');
const searchButton = document.querySelector('.header_content__search__movieButton');
const content = document.querySelector('.section_propertie');
const nameValue = document.querySelector('.header_content__search__movie');
nameValue.value = nameMovie;

const watchListMovieButton = document.querySelector('.watchListMovieButton');
watchListMovieButton.addEventListener('click', () => {
    window.open('../pages/watchList.html', '_self');
})

function getMovies() {
    nameMovie = nameValue.value;
    const apiUrl = `http://www.omdbapi.com/?s=${nameMovie}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        })
        .then((data) => {
            if (data.Response === 'True') {
                content.innerHTML = '';

                data.Search.forEach((movie) => {
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('section_container');

                    movieElement.innerHTML = `
                        <div class="section_container__img">
                            <img width="150px" src="${movie.Poster}" alt="">
                        </div>
                        <div class="section_container__inf">
                            <p class="section_container__inf__title">${movie.Title}</p>
                            <p class="section_container__inf__rating">Year: ${movie.Year}</p>
                            <p class="section_container__inf__genre"><span>Type: </span> ${movie.Type}</p>
                        </div>
                    `;

                    content.appendChild(movieElement);
                });
            } else {
                (nameMovie == null || nameMovie == '') ? content.innerHTML = '<span>Empty</span>' : content.innerHTML = `<span>No movies found for the search query '${nameMovie}'</span>`;
            }
        })
        .catch((error) => {
            content.innerHTML = `<span>An error occurred during the request</span>`;
        });
}
getMovies();


searchButton.addEventListener('click', () => {
    getMovies();
});


document.addEventListener('keydown', (event) => {
    if (event.key == 13) {
        getMovies();
    }
});