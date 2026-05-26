import * as auth from "./auth.js";

const fillName = document.querySelectorAll(".fillName");
const fillEmail = document.querySelectorAll(".fillEmail");

let userData;

// refresh token
await auth.refreshAccessToken();

// display user info on the navbar
displayUserInfo();
async function displayUserInfo() {
    if (!userData) {
        const res = await apiFetch("http://localhost:8000/user/getUser");
        const json = await res.json();
        userData = json;
    }
    fillName.forEach((element) => {
        console.log(userData);
        element.innerText = userData.name;
    });
}

async function apiFetch(url, options = {}) {
    // attach access token
    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${auth.accessToken}`,
    };

    let res = await fetch(url, options);

    // if expired
    if (res.status === 401) {
        const refreshed = await auth.refreshAccessToken();
        if (!refreshed) throw new Error("Token refresh failed");

        // retry request
        options.headers.Authorization = `Bearer ${auth.accessToken}`;
        res = await fetch(url, options);
    }
    return res;
}
