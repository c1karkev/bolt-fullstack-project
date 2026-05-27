import { setNavbarCart } from "./index.js";

let cart = {};

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

export function setCartItem(id, count) {
    if (count == 0) {
        delete card[id];
    } else if (cart[id]) {
        cart[id] = count;
    } else {
        cart[id] = 1;
    }
    saveCart();
}
export function getCartItem(id, count) {
    return cart[id] || 0;
}

export function getCart() {
    return cart;
}

export function cartCount() {
    return Object.values(cart).reduce((acc, num) => acc + num, 0);
}

function saveCart() {
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    setNavbarCart(cartCount());
}
