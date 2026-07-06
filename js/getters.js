const url = "https://api.jikan.moe/v4/";

export async function get_anime_more_info(id) {
    const endpoint = url + `anime/${id}/moreinfo`;
    try {
        const response = await fetch(endpoint);
        const res = await response.json();
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}
export async function get_anime_full(id) {
    const endpoint = url + `anime/${id}/full`;
    try{
        const response = await fetch(endpoint);
        const res = await response.json();
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}
export async function get_anime_characters(id) {
    const endpoint = url + `anime/${id}/characters`;
    try{
        const response = await fetch(endpoint);
        const res = await response.json();
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}

export async function get_manga_full(id) {
    const endpoint = url + `manga/${id}/full`;
    try{
        const response = await fetch(endpoint);
        const res = await response.json();
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}

export async function get_manga_chapters(id) {
    const endpoint = url + `manga/${id}/characters`;
    try{
        const response = await fetch(endpoint);
        const res = await response.json();
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}

export async function get_manga_moreinfol(id) {
    const endpoint = url + `manga/${id}/moreinfo`;
    try{
        const response = await fetch(endpoint);
        const res = await response.json();
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}
export async function get_manga_characters(id) {
    try {
        const res = await fetch(`https://api.jikan.moe/v4/manga/${id}/characters`);
        const data = await res.json();
        return data.data; // повертаємо масив персонажів
    } catch (error) {
        console.error("Error loading manga characters:", error);
        return [];
    }
}
