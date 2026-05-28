import * as auth from "./auth.js";
import * as util from "./util.js";
import { cartCount } from "./cart.js";

const fillName = document.querySelectorAll(".fillName");
const fillLastName = document.querySelectorAll(".fillLastName");
const fillEmail = document.querySelectorAll(".fillEmail");
const fillProfileImage = document.querySelectorAll(".fillProfileImage");

const navLoggedIn = document.getElementById("navLoggedIn");
const navLoggedOut = document.getElementById("navLoggedOut");
const mobileProfileNav = document.getElementById("mobileProfileNav");
const logoutButtons = document.querySelectorAll(".logout");

const cartBadge = document.getElementById("cartBadge");

// refresh token
export let loggedIn;
try {
    loggedIn = await auth.refreshAccessToken();
} catch (err) {
    console.log(err);
    loggedIn = false;
}

// show user data in navbar
let userData;
if (loggedIn) {
    navLoggedIn.style.display = "block";
    navLoggedOut.style.display = "none";
    // display user info on the navbar
    displayUserInfo();
    // add click event to logout buttons
    logoutButtons.forEach((e) =>
        e.addEventListener("click", () => auth.logout()),
    );
} else {
    navLoggedIn.style.display = "none";
    mobileProfileNav.style.display = "none";
}
async function displayUserInfo() {
    if (!userData) {
        const res = await util.apiFetch("http://localhost:8000/user/getUser");
        const json = await res.json();
        userData = json;
    }
    fillName.forEach((element) => (element.innerText = userData.name));
    const splitName = userData.name.split(" ");
    fillLastName.forEach(
        (element) => (element.innerText = splitName[splitName.length - 1]),
    );
    fillEmail.forEach((element) => (element.innerText = userData.email));
    fillProfileImage.forEach(async (element) => {
        const emailHash = await util.getSHA256Hash(userData.email);
        console.log(emailHash);
        element.src = `https://gravatar.com/avatar/${emailHash}`;
    });
}

// Profile
const profile = document.getElementById("profile");
const profileCard = document.getElementById("profileCard");
profile.addEventListener(
    "mouseenter",
    () => (profileCard.style.display = "block"),
);
profile.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!profile.matches(":hover")) {
            profileCard.style.display = "none";
        }
    }, 1000);
});

// show cart count in navbar
setNavbarCart(cartCount());
export function setNavbarCart(count) {
    if (count == 0) {
        cartBadge.classList.add("d-none");
    } else {
        cartBadge.innerText = count;
        cartBadge.classList.remove("d-none");
    }
}

// Error toast
const errorToast = new bootstrap.Toast(document.getElementById("errorToast"));
const errorToastText = document.getElementById("errorToastText");

export function showError(text) {
    errorToastText.innerText = text;
    errorToast.show();
}
