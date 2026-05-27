import * as auth from "./auth.js";
import * as util from "./util.js";

const fillName = document.querySelectorAll(".fillName");
const fillLastName = document.querySelectorAll(".fillLastName");
const fillEmail = document.querySelectorAll(".fillEmail");
const fillProfileImage = document.querySelectorAll(".fillProfileImage");

const navLoggedIn = document.getElementById("navLoggedIn");
const navLoggedOut = document.getElementById("navLoggedOut");
const mobileProfileNav = document.getElementById("mobileProfileNav");
const logoutButtons = document.querySelectorAll(".logout");

// Error toast
const errorToast = new bootstrap.Toast(document.getElementById("errorToast"));
const errorToastText = document.getElementById("errorToastText");

let userData;

// refresh token
export const loggedIn = await auth.refreshAccessToken();
console.log(loggedIn);

if (loggedIn) {
    navLoggedIn.style.display = "block";
    navLoggedOut.style.display = "none";
    // display user info on the navbar
    displayUserInfo();
    async function displayUserInfo() {
        if (!userData) {
            const res = await util.apiFetch(
                "http://localhost:8000/user/getUser",
            );
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
    // add click event to logout buttons
    logoutButtons.forEach((e) =>
        e.addEventListener("click", () => auth.logout()),
    );
} else {
    navLoggedIn.style.display = "none";
    mobileProfileNav.style.display = "none";
}

export function showError(text) {
    errorToastText.innerText = text;
    errorToast.show();
}
