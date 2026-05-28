import { showError } from "./index.js";
import { login, register } from "./auth.js";

const loginNavButton = document.getElementById("loginNavButton");
const registerNavButton = document.getElementById("registerNavButton");

const inputCardBody = document.getElementById("inputCardBody");

const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");

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

// add event listener to click buttons on enter
loginInputs.forEach((e) =>
    e.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            loginButton.click();
        }
    }),
);
registerInputs.forEach((e) =>
    e.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            registerButton.click();
        }
    }),
);

loginNavButton.addEventListener("click", () => {
    switchToLogin();
});
registerNavButton.addEventListener("click", () => {
    switchToRegister();
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    loginForm.classList.add("was-validated");
    if (!loginForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    try {
        await login(loginEmailInput.value, loginPasswordInput.value);
        window.location.href = "/";
    } catch (err) {
        showError("A bejelentkezés sikertelen volt: " + err.message);
        console.log(err);
    }
});
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    validateRegisterPassword();

    registerForm.classList.add("was-validated");
    if (!registerForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }

    try {
        await register(
            registerNameInput.value,
            registerEmailInput.value,
            registerPasswordInput.value,
        );
        window.location.href = "/";
    } catch (err) {
        showError("A regisztráció sikertelen volt: " + err.message);
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

// register password validation
function validateRegisterPassword() {
    if (registerPasswordInput.value != registerRepeatPasswordInput.value) {
        registerRepeatPasswordInput.setCustomValidity(
            "A jelszavak nem egyeznek",
        );
    } else {
        registerRepeatPasswordInput.setCustomValidity("");
    }
}
registerPasswordInput.onchange = validateRegisterPassword;
registerRepeatPasswordInput.onkeyup = validateRegisterPassword;
