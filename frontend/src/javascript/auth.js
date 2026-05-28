export let accessToken;

export async function refreshAccessToken() {
    const res = await fetch("http://localhost:8000/auth/refresh", {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        return false;
    }

    const data = await res.json();
    accessToken = data.accessToken;
    return true;
}

export async function logout() {
    await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        credentials: "include",
    });

    accessToken = null;

    window.location.href = "/login.html";
}

export async function register(name, email, password) {
    let res;
    let data;
    try {
        res = await fetch("http://localhost:8000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
            credentials: "include",
        });
        data = await res.json();
    } catch (err) {
        throw err;
    }
    if (!res.ok) {
        let message = data?.error || res.status;
        console.log(res);
        throw new Error(message);
    }
    accessToken = data.accessToken;
}

export async function login(email, password) {
    let res;
    let data;
    try {
        res = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            credentials: "include",
        });
        data = await res.json();
    } catch (err) {
        throw err;
    }
    if (!res.ok) {
        let message = data?.error || res.status;
        console.log(res);
        throw new Error(message);
    }
    accessToken = data.accessToken;
}
