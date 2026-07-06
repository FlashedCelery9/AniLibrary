import {  get_anime_more_info } from "./getters.js";

function initCarousel(id) {
    const carousel = document.getElementById(id);
    if (!carousel) return;
    const track = carousel.querySelector(".carousel-track");
    const arrows = document.querySelectorAll(`.arrow-btn[data-target="${id}"]`);
    let offset = 0;
    const step = 180;

    arrows.forEach((btn) => {
        btn.addEventListener("click", () => {
            const dir = btn.getAttribute("data-dir");
            const maxScroll = track.scrollWidth - carousel.clientWidth;

            if (dir === "left") {
                offset -= step;
                if (offset < 0) offset = 0;
            } else {
                offset += step;
                if (offset > maxScroll) offset = maxScroll;
            }

            track.style.transform = `translateX(-${offset}px)`;
        });
    });
}

function destroyCarousel(id) {
    let carousel = document.getElementById(id);

    if (!carousel) return;
    const arrows = document.querySelectorAll(`.arrow-btn[data-target="${id}"]`);
    if (id === 'latest-carousel-container'){
        carousel = document.getElementById(`latest-carousel`);
    }
    //НОВА УМОВА ДЛЯ МАНГИ
    arrows.forEach((btn) => {
        console.log("clicked");
        btn.style.display = "none";
    })
    carousel.innerHTML = "";
}

initCarousel("latest-carousel-container");
initCarousel("manga-carousel");

//AddData
async function loadTopAnime() {
    const url = "https://api.jikan.moe/v4/top/anime?limit=3";

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data.data; // масив аніме
    } catch (err) {
        console.error("Помилка при завантаженні топ аніме:", err);
        return [];
    }

}

async function renderPopularAnime() {
    const popularAnime = document.getElementById('popular-anime');
    const data = await loadTopAnime(); // чекаємо відповіді API

    popularAnime.innerHTML = ""; // очистити

    data.forEach(item => {
        popularAnime.innerHTML += `
    <div class="pa-card">
        <div class="pa-thumb">
            <img src="${item.images.jpg.image_url}" alt="${item.title}">
            <div class="pa-rating">
                <span>⭐</span> ${item.score}
            </div>
        </div>
        <div class="pa-title">${item.title}</div>
    </div>
`;

    });
}
async function loadLatestReleases() {
    const url = "https://api.jikan.moe/v4/seasons/now";

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data; // масив аніме
    } catch (err) {
        console.error("Помилка при завантаженні latest releases:", err);
        return [];
    }
}
async function renderLatestReleases() {
    const arrows = document.querySelectorAll(`.arrow-btn[data-target="latest-carousel-container"]`);
    arrows.forEach((btn) => {
        btn.style.display = "flex";
        initCarousel("latest-carousel-container");
    });

    const latest = document.getElementById('latest-carousel');
    const data = await loadLatestReleases();

    latest.innerHTML = "";

    data.forEach(item => {
        let itemId = item.mal_id;

        latest.innerHTML += `
    <div class="item" data-id="${itemId}" data-type="anime">
        <div class="item-thumb">
            <img src="${item.images.jpg.image_url}" alt="${item.title}">
        </div>
        <div class="item-title">${item.title}</div>
    </div>
`
    });
    addEventCardClick();

}
async function loadTopManga(){
    const url = "https://api.jikan.moe/v4/top/manga";
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    }
    catch (err) {
        console.error(err);
    }
}
async function renderTopManga(){
    let data = await loadTopManga();
    let topMangaContainer = document.getElementById('top-manga-container');
    data.forEach(item => {
        let itemId = item.mal_id;

        topMangaContainer.innerHTML +=  `
    <div class="item" data-id="${itemId}" data-type="manga">
        <div class="item-thumb">
            <img src="${item.images.jpg.image_url}" alt="${item.title}">
        </div>
        <div class="item-title">${item.title}</div>
    </div>
    `;
        initCarousel(topMangaContainer);
    })
    addEventCardClick();
}
async function loadLatestManga(){
    const url = "https://api.jikan.moe/v4/manga?limit=20";
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    }
    catch (err) {
        console.error(err);
    }
}
async function renderLatestManga(){
    const arrows = document.querySelectorAll(`.arrow-btn[data-target="latest-carousel-container"]`);

    arrows.forEach((btn) => {
        if(btn.style.display === "none"){
            btn.style.display = "flex";
            initCarousel("latest-carousel-container");
        }
    });
    const latest = document.getElementById('latest-carousel');
    const data = await loadLatestManga();

    latest.innerHTML = "";

    data.forEach(item => {
        let itemId = item.mal_id;
        latest.innerHTML += `
             <div class="item" data-id="${itemId}" data-type="manga">
                <div class="item-thumb">
                    <img src="${item.images.jpg.image_url}" alt="${item.title}">
                </div>
                <div class="item-title">${item.title}</div>
            </div>
        `;

    });
    addEventCardClick();
}
renderLatestReleases();
renderTopManga();
renderPopularAnime();

const tabs = document.querySelectorAll(".tab-btn");
tabs.forEach(btn => {
    btn.addEventListener("click", () => {
        if(document.getElementById('scroll-container')){
            document.getElementById('scroll-container').remove();
        }

        // зняти active з усіх
        tabs.forEach(b => b.classList.remove("active"));

        // додати active на натиснуту
        btn.classList.add("active");
        if(btn.textContent === "Anime"){

            renderLatestReleases();
        }
        else if(btn.textContent === "Manga"){
            renderLatestManga()
        }
        else{
            renderLatestManga()

        }
    });
});

async function searchAnimeByName(title) {
    const url = `https://api.jikan.moe/v4/anime?q=${title}&limit=10`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    } catch (err) {
    }
}

const searchInput = document.getElementById('search-anime-by-name');
const searchInputmobile = document.getElementById('mobile-search-input');

const dropdown = document.getElementById('search-dropdown');
const dropdownMobile = document.getElementById('search-dropdown-mobile');

searchInput.addEventListener('input', async (e) => {
    const title = e.target.value.trim();

    if (title.length < 3) {
        dropdown.style.display = "none";
        dropdown.innerHTML = "";
        return;
    }

    const results = await searchAnimeByName(title);

    dropdown.innerHTML = "";

    if (results.length === 0) {
        dropdown.style.display = "none";
        return;
    }

    dropdown.style.display = "flex";

    results.slice(0, 10).forEach(item => {
        dropdown.innerHTML += `
            <div class="search-item">${item.title}</div>
        `;
    });
});
searchInputmobile.addEventListener('input', async (e) => {
    const title = e.target.value.trim();

    if (title.length < 3) {
        dropdownMobile.style.display = "none";
        dropdownMobile.innerHTML = "";
        return;
    }

    const results = await searchAnimeByName(title);

    dropdownMobile.innerHTML = "";

    if (results.length === 0) {
        dropdownMobile.style.display = "none";
        return;
    }

    dropdownMobile.style.display = "flex";

    results.slice(0, 10).forEach(item => {
        dropdownMobile.innerHTML += `
            <div class="search-item">${item.title}</div>
        `;
    });
});


//Browse Now animation
function smoothScroll(targetY, duration = 600) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        // easing (плавне прискорення/уповільнення)
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startY + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

//Browse latest and tops animations
document.getElementById('browse-now-btn').addEventListener('click',() => {
    const target_to = document.getElementById('latest');
    const y = target_to.offsetTop;
    smoothScroll(y, 2000);
});

document.getElementById('go-to-top-btn').addEventListener('click',() => {
    const target_to = document.getElementById('manga');
    const y = target_to.offsetTop;
    smoothScroll(y, 2000);
});

//View all buttons
const view_all_latest_btn = document.getElementById('view-all-latest');
view_all_latest_btn.addEventListener('click', async () => {
    destroyCarousel('latest-carousel-container');
    const container_latest = document.getElementById('latest-carousel-container');
    if(!document.getElementById('scroll-container')){
        container_latest.innerHTML += '<div class="scroll-container" id="scroll-container"></div>';
    }
    let container = document.getElementById('scroll-container');
    container.innerHTML = '';

    const data = await loadLatestReleases();
    console.log(data);
    data.forEach(item => {
        // let producers = item.producers.toString();
        container.innerHTML += `
    <div class="viewall-item">
        <img src="${item.images.jpg.image_url}" alt="${item.title}">
        <div class="viewall-info">
            <h3>"${item.title}"</h3>
        </div>
    </div>
   `;
    })


});
const burgerBtn = document.querySelector(".burger-btn");
const mobileMenu = document.querySelector(".mobile-menu");

burgerBtn.addEventListener("click", () => {
    mobileMenu.style.display =
        mobileMenu.style.display === "flex" ? "none" : "flex";
});

// Закриття при кліку поза меню
document.addEventListener("click", (e) => {
    if (!e.target.closest(".mobile-header")) {
        mobileMenu.style.display = "none";
    }
});


//Відкрити сторінку тайтлу
function openAnimePage(id){
    const params = new URLSearchParams({id: id.toString()});
    window.open(`card.html?${params.toString()}`, "_blank");
}
function openMangaPage(id){
    const params = new URLSearchParams({id: id.toString()});
    window.open(`mangaCard.html?${params.toString()}`, "_blank");
}
function addEventCardClick(){
    let anime_cards = document.querySelectorAll('.item');
    anime_cards.forEach(item => {
        item.addEventListener('click', (e) => {
            const id = item.dataset.id;
            const type = item.dataset.type;
            console.log('clicked' + id);
            if(type === "anime"){
                openAnimePage(id);
            }
            if(type === "manga"){
                openMangaPage(id);
            }
        });
    })
}
