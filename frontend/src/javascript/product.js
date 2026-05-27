import * as util from "./util.js";
import * as cart from "./cart.js";
import { showError } from "./index.js";

const cartAddButton = document.getElementById("cartAddButton");
const cartAddCount = document.getElementById("cartAddCount");
const cartAmount = document.getElementById("cartAmount");
const cartAmountParagraph = document.getElementById("cartAmountParagraph");

// get specified product id
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// if no id specified, go to main page
if (!id) {
    window.location = "/";
}

// update cart count info
updateCartCount();

// fetch product info
let product;
try {
    product = await util.fetchProductById(id);
} catch (err) {
    console.log(err);
    showError("Hiba történt a termék betöltésekor");
    //setTimeout(() => (window.location = "/"), 3000);
}

// register cart add button handler
cartAddButton.addEventListener("click", () => {
    cart.setCartItem(id, +cart.getCartItem(id) + +cartAddCount.value);
    updateCartCount();
});

function updateCartCount() {
    const count = cart.getCartItem(id);
    if (count === 0) {
        cartAmountParagraph.classList.add("d-none");
    } else {
        cartAmount.innerText = count;
        cartAmountParagraph.classList.remove("d-none");
    }
}
