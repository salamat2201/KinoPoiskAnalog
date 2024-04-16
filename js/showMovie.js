const thisMovie = JSON.parse(localStorage.getItem('thisMovie'));
console.log(thisMovie);

const watchListMovieButton = document.querySelector('.watchListMovieButton');
watchListMovieButton.addEventListener('click', () => {
    window.open('../pages/watchList.html', '_self');
});

const el = document.querySelector('.section_propertie');
let gen = '';
for(let j = 0; j < thisMovie.genres.length - 1; j++) {
    gen += thisMovie.genres[j].genre + ', ';
}
gen += thisMovie.genres[thisMovie.genres.length - 1].genre;
const subEl = document.createElement('div');
subEl.classList.add('section_container');
subEl.innerHTML = `
    <div class="section_container__img">
        <img width="150px" height="200px" src="${thisMovie.posterUrlPreview}" alt="">
    </div>
    <div class="section_container__inf">
        <p class="section_container__inf__title">${thisMovie.nameOriginal}</p>
        <p class="section_container__inf__rating">Rating: ${thisMovie.ratingKinopoisk}</p>
        <p class="section_container__inf__genre"><span>Genre: </span> ${gen}</p>
        <p class="section_container__inf__country"><span>Country:</span> ${thisMovie.countries[0].country}</p>
    </div>
    <div class="aboutFilm"><span>About the film:</span> <br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ut cupiditate voluptas eaque ratione assumenda amet incidunt nostrum veritatis? Adipisci dolores distinctio quis accusamus sint repellat voluptas nam mollitia voluptatum. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus unde quisquam iste facilis id magni commodi ex nostrum, officiis ullam assumenda fugiat aperiam maiores sed odio quas praesentium ad laudantium.
    </div>
`;
const watchVideo = document.createElement('button');
watchVideo.textContent = 'Watch';
watchVideo.addEventListener('click', () => {
    window.open(`https://www.google.com/search?sca_esv=07e2017943e51a4e&q=${thisMovie.nameOriginal + ' movie'}&tbm=vid&source=lnms&sa=X&ved=2ahUKEwj318XQ85GEAxX4_7sIHWbfC5wQ0pQJegQIDBAB
    `, '_self');
})
const f = document.querySelector('section_container__inf');
subEl.appendChild(watchVideo)
el.appendChild(subEl);