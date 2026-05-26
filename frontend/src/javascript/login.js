const loginNavButton = document.getElementById("loginNavButton");
const registerNavButton = document.getElementById("registerNavButton");

const inputCardBody = document.getElementById("inputCardBody");

const loginContainer = document.getElementById("login");
const registerContainer = document.getElementById("register");

const loginButton = document.getElementById("loginButton");
const loginEmailInput = document.getElementById("loginEmail");
const loginPasswordInput = document.getElementById("loginPassword");
const registerButton = document.getElementById("registerButton");
const registerNameInput = document.getElementById("registerName");
const registerEmailInput = document.getElementById("registerEmail");
const registerPasswordInput = document.getElementById("registerPassword");
const registerRepeatPasswordInput = document.getElementById(
    "registerRepeatPassword",
);

const loginInputs = document.querySelectorAll("#login input, #login button");
const registerInputs = document.querySelectorAll(
    "#register input, #register button",
);

loginNavButton.addEventListener("click", () => {
    switchToLogin();
});
registerNavButton.addEventListener("click", () => {
    switchToRegister();
});

loginButton.addEventListener("click", async () => {
    try {
        const res = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: loginEmailInput.value,
                password: loginPasswordInput.value,
            }),
            credentials: "include",
        });
        if (!res.ok) {
            //TODO: show error
            console.log(res);
            return;
        }
        const data = await res.json();
        accessToken = data.accessToken;
        window.location.href = "/";
    } catch (err) {
        console.log(err);
    }
});
registerButton.addEventListener("click", async () => {
    if (registerPasswordInput.value !== registerRepeatPasswordInput.value) {
        // TODO: show error
        return;
    }

    try {
        const res = await fetch("http://localhost:8000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: registerNameInput.value,
                email: registerEmailInput.value,
                password: registerPasswordInput.value,
            }),
            credentials: "include",
        });
        if (!res.ok) {
            //TODO: show error
            console.log(res);
            return;
        }
        const data = await res.json();
        accessToken = data.accessToken;
        window.location.href = "/";
    } catch (err) {
        console.log(err);
    }
});

// navigate to register if specified in url
const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
if (mode === "register") {
    switchToRegister();
} else {
    switchToLogin();
}

function switchToLogin() {
    // change active cardbody
    inputCardBody.classList.remove("register");
    inputCardBody.classList.add("login");
    // disable register inputs
    registerInputs.forEach((e) => disableInput(e));
    // enable login inputs
    loginInputs.forEach((e) => enableInput(e));
    registerNavButton.classList.remove("active");
    loginNavButton.classList.add("active");
}

function switchToRegister() {
    // change active cardbody
    inputCardBody.classList.remove("login");
    inputCardBody.classList.add("register");
    // disable login inputs
    loginInputs.forEach((e) => disableInput(e));
    // enable register inputs
    registerInputs.forEach((e) => enableInput(e));
    // switch classes of card navigation
    loginNavButton.classList.remove("active");
    registerNavButton.classList.add("active");
}

function disableInput(e) {
    e.disabled = true;
    e.ariaDisabled = true;
    e.tabIndex = -1;
}

function enableInput(e) {
    e.disabled = false;
    e.ariaDisabled = false;
    e.tabIndex = 0;
}
