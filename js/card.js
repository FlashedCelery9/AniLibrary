import {get_anime_full, get_anime_more_info, get_anime_characters} from "./getters.js";

let page = document.getElementById('anime-page');
const params = new URLSearchParams(window.location.search);
let id = params.get('id');
const data = await get_anime_full(id);
let moreInfo = await get_anime_more_info(id);
page.innerHTML = `
      <div class="anime-glass">
        <div class="anime-cover">
                <img src="${data.images.jpg.image_url}" alt="Anime Cover">
        </div>

        <div class="anime-info">
            <h1 class="anime-title">Original title: ${data.title_japanese}</h1>
            <h1 class="anime-title">English title: ${data.title_english}</h1>


            <div class="anime-meta">
                <span>⭐ ${data.score}</span>
                <span>${data.type} • ${data.episodes} episodes</span>
                <span>${data.year}</span>
            </div>

            <p class="anime-desc">
               ${moreInfo.moreinfo}
            </p>

            <div class="anime-tags" id="anime-tags">
            </div>

            <button class="anime-btn" id="anime-btn">Watch Trailer</button>
            <div id="trailer-modal" class="trailer-modal">
                <div class="trailer-content">
                    <span class="close-btn">&times;</span>
                    <iframe id="trailer-frame" src="${data.trailer.embed_url}" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
        <h2 class="section-title">Characters</h2>
    <div class="char-list" id="characters-container">
        

     
        
    </div>
`;

let tags = document.getElementById('anime-tags');
let data_tags = data.genres;
data_tags.forEach(tag => {
    tags.innerHTML += `<span>${tag.name}</span>`
})


// кнопка "Watch Trailer"
const btn = document.querySelector(".anime-btn");

btn.addEventListener("click", () => {
    if (!data.trailer) {
        alert("Trailer not available");
        return;
    }

    const modal = document.getElementById("trailer-modal");
    const frame = document.getElementById("trailer-frame");

    frame.src = `${data.trailer.embed_url}`;
    modal.style.display = "flex";
});

// закриття
document.querySelector(".close-btn").addEventListener("click", () => {
    const modal = document.getElementById("trailer-modal");
    const frame = document.getElementById("trailer-frame");

    frame.src = ""; // зупиняє відео
    modal.style.display = "none";
});

//Load characters
let characters = await get_anime_characters(id);
let characters_container = document.getElementById("characters-container");
characters.forEach(character => {
    characters_container.innerHTML += `
         <div class="char-card">
                <img src="${character.character.images.jpg.image_url}" alt="${character.character.name}">
                <p>${character.character.name}</p>
            </div>
    `
});
