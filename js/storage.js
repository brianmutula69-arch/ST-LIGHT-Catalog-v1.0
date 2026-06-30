const KEY = "stlight-favorites";

export function getFavorites() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveFavorite(id) {

    let fav = getFavorites();

    if (!fav.includes(id)) {

        fav.push(id);

        localStorage.setItem(KEY, JSON.stringify(fav));

    }

}

export function removeFavorite(id) {

    let fav = getFavorites().filter(x => x !== id);

    localStorage.setItem(KEY, JSON.stringify(fav));

}
