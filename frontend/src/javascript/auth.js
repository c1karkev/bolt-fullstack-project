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
