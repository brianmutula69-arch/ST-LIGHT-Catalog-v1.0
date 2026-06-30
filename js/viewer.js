let current = null;

export function openViewer(product) {

    current = product;

    document.getElementById("viewerImage").src = product.image;

    document.getElementById("viewerTitle").innerText = product.name;

    document
        .getElementById("imageViewer")
        .classList.remove("hidden");

}

export function closeViewer() {

    document
        .getElementById("imageViewer")
        .classList.add("hidden");

}
