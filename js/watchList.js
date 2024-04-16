let favorite = [];
document.addEventListener('DOMContentLoaded', function () {
    const fav = localStorage.getItem("fav");
    if (fav !== null) {
        favorite = JSON.parse(fav);

    }
    const el = document.querySelector('.section_propertie');
    let gen = '';
    for (let i = 0; i < favorite.length; i++) {
        for(let j = 0; j < favorite[i].genres.length - 1; j++) {
            gen += favorite[i].genres[j].genre + ', ';
        }
        gen += favorite[i].genres[favorite[i].genres.length - 1].genre;
        const subEl = document.createElement('div');
        subEl.classList.add('section_container');
        subEl.innerHTML = `
        <div class="section_container__img">
            <img width="150px" src="${favorite[i].posterUrlPreview}" alt="">
        </div>
        <div class="section_container__inf">
            <p class="section_container__inf__title">${favorite[i].nameOriginal}</p>
            <p class="section_container__inf__rating">Rating: ${favorite[i].ratingKinopoisk}</p>
            <p class="section_container__inf__genre"><span>Genre: </span> ${gen}</p>
            <p class="section_container__inf__country"><span>Country:</span> ${favorite[i].countries[0].country}</p>
        </div>
        <div class="aboutFilm"><span>About the film:</span> <br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ut cupiditate voluptas eaque ratione assumenda amet incidunt nostrum veritatis? Adipisci dolores distinctio quis accusamus sint repellat voluptas nam mollitia voluptatum. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus unde quisquam iste facilis id magni commodi ex nostrum, officiis ullam assumenda fugiat aperiam maiores sed odio quas praesentium ad laudantium.
        </div>
        `;
        const watchVideo = document.createElement('button');
        watchVideo.textContent = 'Delete';
        watchVideo.addEventListener('click', () => {
            el.removeChild(subEl);  // Remove the element from the DOM
            favorite.splice(i, 1);  // Remove the movie from the array
            updateLocalStorage();  // Update local storage after modification
        });

        subEl.appendChild(watchVideo);
        el.appendChild(subEl);
    }
});

function updateLocalStorage() {
    localStorage.setItem("fav", JSON.stringify(favorite));
}