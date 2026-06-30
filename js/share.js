export async function shareLink(product) {

    const url =
        `${location.origin}${location.pathname}?product=${product.id}`;

    if (navigator.share) {

        navigator.share({

            title: product.name,

            text: "View this product on ST LIGHT",

            url

        });

    } else {

        await navigator.clipboard.writeText(url);

        alert("Link copied.");

    }

}
