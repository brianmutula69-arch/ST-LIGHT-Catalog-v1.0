import {
    loadCatalog,
    renderCategories,
    renderProducts,
    getAllProducts,
    filterProductsByCategory,
    searchProducts
} from "./catalog.js";

import {
    saveFavorite,
    getFavorites
} from "./storage.js";

import {
    openViewer,
    closeViewer
} from "./viewer.js";

let catalog = null;
let currentProducts = [];

/* -----------------------------
   Initialize App
------------------------------ */

document.addEventListener("DOMContentLoaded", async () => {

    catalog = await loadCatalog();

    renderCategories(catalog.categories);

    currentProducts = getAllProducts(catalog);

    renderProducts(currentProducts);

    setupEvents();

});

/* -----------------------------
   Events
------------------------------ */

function setupEvents(){

    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", e=>{

        const value = e.target.value.trim();

        const results = searchProducts(catalog,value);

        renderProducts(results);

    });

    document.getElementById("closeViewer")
        .addEventListener("click",closeViewer);

}

/* -----------------------------
   Category Click
------------------------------ */

window.selectCategory = function(id){

    currentProducts = filterProductsByCategory(catalog,id);

    renderProducts(currentProducts);

}

/* -----------------------------
   Product Click
------------------------------ */

window.openProduct = function(id){

    const product = currentProducts.find(p=>p.id===id);

    if(!product) return;

    openViewer(product);

}

/* -----------------------------
   Favorite
------------------------------ */

window.favoriteProduct = function(id){

    saveFavorite(id);

    alert("Saved to Favorites ❤️");

}

/* -----------------------------
   Share
------------------------------ */

window.shareProduct = async function(id){

    const url =
        window.location.origin+
        window.location.pathname+
        "?product="+id;

    if(navigator.share){

        await navigator.share({

            title:"ST LIGHT",

            text:"Check this product",

            url

        });

    }else{

        await navigator.clipboard.writeText(url);

        alert("Product link copied.");

    }

}
