import { setNavbarCart } from "./index.js";

let cart = {};

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

export function setCartItem(id, count) {
    if (count == 0) {
        delete cart[id];
    } else if (cart[id]) {
        cart[id] = +count;
    } else {
        cart[id] = +count;
    }
    saveCart();
}
export function getCartItem(id, count) {
    return +cart[id] || 0;
}

export function getCart() {
    return cart;
}

export function emptyCart() {
    cart = {};
}

export function cartCount() {
    return Object.values(cart).reduce((acc, num) => acc + num, 0);
}

function saveCart() {
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    setNavbarCart(cartCount());
}
