import { loggedIn } from "./index.js";
import * as auth from "./auth.js";

export async function getSHA256Hash(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashHex = new Uint8Array(hashBuffer).toHex(); // Convert ArrayBuffer to hex string.
    return hashHex;
}

export async function apiFetch(url, options = {}) {
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
