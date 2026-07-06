import {
    get_manga_full,
    get_manga_chapters,
    get_manga_moreinfol,
    get_manga_characters
} from "./getters.js";

const params = new URLSearchParams(window.location.search);
let id = params.get('id');

// --- API ---
let moreinfo = await get_manga_moreinfol(id);
let chapters = await get_manga_chapters(id);
let data = await get_manga_full(id);
let characters = await get_manga_characters(id);

// --- Chapters count ---
let chaptersCount = chapters?.data?.length || data.chapters || 0;

// --- Render main card ---
let mangaCard = document.getElementById('manga-card');

mangaCard.innerHTML = `
    <div class="manga-cover">
        <img src="${data.images.jpg.image_url}" alt="Manga Cover" id="manga-cover-img">
    </div>

    <div class="manga-info">
        <h1 class="manga-title">${data.title_japanese || data.title}</h1>
        <h2 class="manga-title" id="manga-title-rom">${data.title}</h2>

        <div class="manga-meta">
            <span id="manga-score">⭐ ${data.score || "N/A"}</span>
            <span id="manga-volumes">${data.volumes || "?"} volumes</span>
            <span id="manga-chapters">${chaptersCount} chapters</span>
            <span id="manga-status">Status: ${data.status}</span>
        </div>

        <p class="manga-desc">
            ${moreinfo?.moreinfo || data.synopsis || "No description available."}
        </p>

        <div class="manga-tags" id="manga-tags"></div>

        <div class="manga-authors" id="manga-authors"></div>

        <div class="manga-themes" id="manga-themes"></div>

        <div class="manga-demo" id="manga-demo"></div>
            <div class="manga-characters">
    <h2 class="section-title">Characters</h2>
    <div class="char-list" id="char-list"></div>
</div>
    </div>

</div>


`;

// --- Genres ---
let tags_container = document.getElementById('manga-tags');
data.genres.forEach(tag => {
    tags_container.innerHTML += `<span class="tag">${tag.name}</span>`;
});

// --- Authors ---
let authors_container = document.getElementById('manga-authors');
authors_container.innerHTML = `<h3 class="section-subtitle">Authors</h3>`;
data.authors.forEach(author => {
    authors_container.innerHTML += `<span class="tag">${author.name}</span>`;
});

// --- Themes ---
let themes_container = document.getElementById('manga-themes');
themes_container.innerHTML = `<h3 class="section-subtitle">Themes</h3>`;
data.themes.forEach(theme => {
    themes_container.innerHTML += `<span class="tag">${theme.name}</span>`;
});

// --- Demographics ---
let demo_container = document.getElementById('manga-demo');
demo_container.innerHTML = `<h3 class="section-subtitle">Demographics</h3>`;
data.demographics.forEach(demo => {
    demo_container.innerHTML += `<span class="tag">${demo.name}</span>`;
});

// --- Characters ---
let charList = document.getElementById('char-list');
let limit = 20;
characters.forEach(c => {
    if(limit !== 0){
        charList.innerHTML += `
        <div class="char-card">
            <img src="${c.character.images.jpg.image_url}" alt="${c.character.name}">
            <p>${c.character.name}</p>
        </div>
    `;
    }
    else{
        return;
    }
    limit--;

});
