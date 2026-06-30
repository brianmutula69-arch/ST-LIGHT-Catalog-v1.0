import * as Catalog from "./catalog.js";
import * as Viewer from "./viewer.js";
import * as Storage from "./storage.js";
import * as Share from "./share.js";

let data;
let products=[];

document.addEventListener("DOMContentLoaded",init);

async function init(){

    data=await Catalog.loadCatalog();

    Catalog.renderCategories(data.categories);

    products=Catalog.getAllProducts(data);

    Catalog.renderProducts(products);

    setupSearch();

    loadFromURL();

}

function setupSearch(){

    searchInput.addEventListener("input",e=>{

        Catalog.renderProducts(

            Catalog.searchProducts(data,e.target.value)

        );

    });

}

window.selectCategory=id=>{

    Catalog.renderProducts(

        Catalog.filterProductsByCategory(data,id)

    );

};

window.openProduct=id=>{

    const p=products.find(x=>x.id===id);

    Viewer.openViewer(p);

};

window.favoriteProduct=id=>{

    Storage.saveFavorite(id);

};

window.shareProduct=id=>{

    const p=products.find(x=>x.id===id);

    Share.shareLink(p);

};

function loadFromURL(){

    const q=new URLSearchParams(location.search);

    if(q.has("category")){

        selectCategory(q.get("category"));

    }

    if(q.has("product")){

        const p=products.find(x=>x.id===q.get("product"));

        if(p) Viewer.openViewer(p);

    }

}
