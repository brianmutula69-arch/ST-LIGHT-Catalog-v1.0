export function normalize(text) {
    return text.trim().toLowerCase();
}

export function matches(product, keyword) {
    return product.name
        .toLowerCase()
        .includes(normalize(keyword));
}
