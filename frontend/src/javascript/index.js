import * as auth from "./auth.js";

const fillName = document.querySelectorAll(".fillName");
const fillLastName = document.querySelectorAll(".fillLastName");
const fillEmail = document.querySelectorAll(".fillEmail");
const fillProfileImage = document.querySelectorAll(".fillProfileImage");

const navLoggedIn = document.getElementById("navLoggedIn");
const navLoggedOut = document.getElementById("navLoggedOut");
const mobileProfileNav = document.getElementById("mobileProfileNav");

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
            const res = await apiFetch("http://localhost:8000/user/getUser");
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
            const emailHash = await getSHA256Hash(userData.email);
            console.log(emailHash);
            element.src = `https://gravatar.com/avatar/${emailHash}`;
        });
    }
} else {
    navLoggedIn.style.display = "none";
    mobileProfileNav.style.display = "none";
}

async function apiFetch(url, options = {}) {
    let res;
    if (loggedIn) {
        // attach access token
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${auth.accessToken}`,
        };

        res = await fetch(url, options);

        // if expired
        if (res.status === 401) {
            const refreshed = await auth.refreshAccessToken();
            if (!refreshed) throw new Error("Token refresh failed");

            // retry request
            options.headers.Authorization = `Bearer ${auth.accessToken}`;
            res = await fetch(url, options);
        }
    } else {
        res = await fetch(url, options);
    }
    return res;
}

async function getSHA256Hash(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashHex = new Uint8Array(hashBuffer).toHex(); // Convert ArrayBuffer to hex string.
    return hashHex;
}
