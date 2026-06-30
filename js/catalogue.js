export async function loadCatalog() {
    const res = await fetch("./daata/catalog.json");
    return await res.json();
}

export function getAllProducts(data) {
    return data.categories.flatMap(category =>
        category.products.map(product => ({
            ...product,
            category: category.id
        }))
    );
}

export function filterProductsByCategory(data, id) {
    return getAllProducts(data).filter(p => p.category === id);
}

export function searchProducts(data, text) {
    return getAllProducts(data).filter(p =>
        p.name.toLowerCase().includes(text.toLowerCase())
    );
}

export function renderCategories(categories) {

    const grid = document.getElementById("categoryGrid");

    grid.innerHTML = "";

    categories.forEach(category => {

        grid.innerHTML += `
        <div class="category-card"
        onclick="selectCategory('${category.id}')">

            <img src="${category.cover}" alt="${category.name}">

            <div class="category-content">

                <h3>${category.name}</h3>

                <span>${category.products.length} Products</span>

            </div>

        </div>
        `;

    });

}

export function renderProducts(products) {

    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    products.forEach(product => {

        grid.innerHTML += `
        <div class="product-card">

            <img
            src="${product.image}"
            onclick="openProduct('${product.id}')">

            <div class="product-info">

                <h3>${product.name}</h3>

                <div class="product-actions">

                    <button
                    class="favorite"
                    onclick="favoriteProduct('${product.id}')">

                    ❤

                    </button>

                    <button
                    class="share"
                    onclick="shareProduct('${product.id}')">

                    🔗

                    </button>

                </div>

            </div>

        </div>
        `;

    });

}
