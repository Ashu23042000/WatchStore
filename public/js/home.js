
let banner_btn = document.querySelector(".banner_btn");
let banner2_btn = document.querySelectorAll(".banner2_btn");


banner_btn.addEventListener("click", () => {
    window.scrollBy(0, 800);
});

banner2_btn.forEach(btn => {
    btn.addEventListener("click", () => {
        window.scrollBy(0, 650);
    });
});

// Add to cart functionality------

let addToCart = document.querySelectorAll(".cart_btn");

const updateCart = async (product) => {
    let res = await fetch("/cart", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    let response = await res.json();
    if (res.status == 201) {
        alert(response.message)
    }
    console.log(response);
};


addToCart.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let product = JSON.parse(btn.dataset.product);
        updateCart(product);
    });
});