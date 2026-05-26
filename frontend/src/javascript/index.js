let accessToken;

// display user info on the navbar
displayUserInfo();
async function displayUserInfo() {}

async function apiFetch(url, options = {}) {
    // attach access token
    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
    };

    let res = await fetch(url, options);

    // if expired
    if (res.status === 401) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) throw new Error("Token refresh failed");

        // retry request
        options.headers.Authorization = `Bearer ${accessToken}`;
        res = await fetch(url, options);
        return res;
    }
}
