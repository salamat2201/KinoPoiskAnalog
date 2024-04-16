const apiKEY = '34960a1f-ebdb-4eb9-be1c-166d13725f6e';
const apiURL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=2';
const apiURLComingSoon = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=3';


// создаем массив для главного section, что бы менять при нажатии button left or right
let mainImgs = [
    'https://i.ibb.co/GpQVZsd/1440-320-suoer-vtornik.webp;',
    'https://i.ibb.co/K6cMgKb/1440x320-BP-2000.webp;',
    'https://i.ibb.co.com/X7QZtt2/1440x320-kawan-uilenesin.webp;',
    'https://i.ibb.co/PQR3HFQ/1440-320-tiger-sreda.webp;',
    'https://i.ibb.co.com/bKb1K9Q/1440x320-v1-2.webp;',
    'https://i.ibb.co/Lr8YKdk/1440x320-raspisanie-2024-1.webp;'
];
const mainDivforImg = document.querySelector('.section_main');
const mainImg = document.createElement('img');
mainImg.classList.add('section_main__img');
mainImg.src = mainImgs[0];
mainDivforImg.appendChild(mainImg);

const leftButtonForImg = document.querySelector('.section_main__chevron__left');
const rightButtonForImg = document.querySelector('.section_main__chevron__right');

let count = 1;
leftButtonForImg.addEventListener('click', () => {
    if(count == -1) count = mainImgs.length - 1;
    mainImg.src = mainImgs[count--];
    if(count == -1) count = mainImgs.length - 1;
});

rightButtonForImg.addEventListener('click', () => {
    if(count == mainImgs.length) count = 0;
    mainImg.src = mainImgs[count++];
    if(count == mainImgs.length) count = 0;
});


// создаем массив, что бы сохранять избранные фильмы
let favorite = [];


// изменяем данные при нажатии на buttonNowShowing или buttonComingSoon.
const buttonNowShowing = document.querySelector('.linkNowShowing');
const buttonComingSoon = document.querySelector('.linkComingSoon');
getMovies(apiURL);
buttonNowShowing.addEventListener('click', () => {
    getMovies(apiURL);
});
buttonComingSoon.addEventListener('click', () => {
    getMovies(apiURLComingSoon);
});


// нажимая на buttonWatchList, переходим на watchList.html
const buttonWatchList = document.querySelector('.watchListMovieButton');
buttonWatchList.addEventListener('click', () => {
    window.open('../pages/watchList.html', '_self')
});


// принимаем api, где есть фильмы
async function getMovies(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKEY
        },
    });
    const responseData = await response.json();
    showMovies(responseData);
    console.log(responseData)
}


// даже при обнавление страниц, сохраняем данные в localstorage
document.addEventListener('DOMContentLoaded', function () {
    const fav = localStorage.getItem("fav");
    if (fav !== null) {
        favorite = JSON.parse(fav);
    }
});


// показываем фильмы
const showMovies = (data) => {
    const element = document.querySelector('.section_content__movies');
    element.innerHTML = '';

    // пробежаемся у каждого фильма
    data.items.forEach((movie) => {
        // открываем div для каждог фильма
        const subElement = document.createElement('div');
        subElement.classList.add('section_content__movies__movie');

        let genre = '';
        if (movie.genres && movie.genres.length > 0) {
            genre = movie.genres[0].genre;
        } else {
            genre = null;
        }

        subElement.innerHTML = `
            <div class="section_content__movies__movie__rating">${movie.ratingKinopoisk}</div>
            <img
                width="250px"
                height="350px"
                src="${movie.posterUrlPreview}"
                title="${movie.nameRu}"
            >
            <p class="section_content__movies__movie__title">${movie.nameOriginal}</p>
            <p class="section_content__movies__movie__genre">${genre}</p>
        `;



        subElement.addEventListener('click', () => {
            localStorage.setItem('thisMovie', JSON.stringify(movie));
            window.open('../pages/showMovie.html', '_self');
        });


        // создаем button, что бы сохранить фильм в избранные
        const fav = document.createElement('button');
        fav.classList.add('watchListButton');
        if (favorite.length !== null) {
            for (let i = 0; i < favorite.length; i++) {
                if (favorite[i].kinopoiskId === movie.kinopoiskId) {
                    fav.classList.add('watchListButtonYellow');
                }
            }
        }
        fav.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                        </svg>`;
        fav.addEventListener('click', (event) => {
            event.stopPropagation();
            for (let i = 0; i < favorite.length; i++) {
                if (favorite[i].kinopoiskId === movie.kinopoiskId) {
                    fav.classList.toggle('watchListButtonYellow');
                    favorite = favorite.filter(item => item.kinopoiskId !== favorite[i].kinopoiskId);
                    localStorage.setItem('fav', JSON.stringify(favorite));
                    return;
                }
            }
            fav.classList.toggle('watchListButtonYellow');
            favorite.push(movie);
            localStorage.setItem('fav', JSON.stringify(favorite));
        });


        subElement.appendChild(fav);
        element.appendChild(subElement);

    });
};

const searchButton = document.querySelector('.header_content__search__movieButton');
searchButton.addEventListener('click', () => {
    const nameMovie = document.querySelector('.header_content__search__movie');
    localStorage.setItem('name', nameMovie.value);
    window.open('../pages/search.html', '_self');
});