const LOGIN_FILL_UP_ERROR_TEXT = "Login must be more than 5 simbols";
const PASSWORD_FILL_UP_TEXT = "Please fill up your password";
const LOGIN_USER_NOT_EXIST_ERROR_TEXT = "User with this login does not exist";


const signOut = document.getElementById("signOut");

const inputs = Array.from(document.getElementsByClassName("form-control"));

const loginForm = document.getElementById("loginForm");

const removeSpace = (string) => string.replace(/\s+/, "");

let users = JSON.parse(localStorage.getItem("users")) || [];

function removeClass(element) {
    const errorSpans = element.parentElement.getElementsByClassName("errorSpan");
    if (errorSpans) {
        Array.from(errorSpans).forEach(item => item.remove());
    }
    return true;
}


function addErrorSpan(element, spanContent) {
    const errorSpan = document.createElement("span");
    errorSpan.classList = "errorSpan";
    errorSpan.textContent = spanContent;
    element.parentElement.appendChild(errorSpan);
}

function addErrorClass(inputs) {
    let inputsAreValid = true;
    if (document.getElementsByClassName("errorSpan")) {
        Array.from(document.getElementsByClassName("errorSpan")).forEach(item => item.remove());
    }
    inputs.forEach((input) => {
        if (input.name === "login" && input.value.length < 6) {
            addErrorSpan(input, LOGIN_FILL_UP_ERROR_TEXT);
            inputsAreValid = false;
        }
        if (input.name === "login" && input.value.length >= 6 && !users.find(user => user.login === input.login)) {
            addErrorSpan(input, LOGIN_USER_NOT_EXIST_ERROR_TEXT);
            inputsAreValid = false;
        }
        if (input.name === "password" && input.value.length < 6) {
            addErrorSpan(input, PASSWORD_FILL_UP_TEXT);
            inputsAreValid = false;
        }
    });
    return inputsAreValid;
}

inputs.forEach((input) => {
    input.addEventListener("textInput", () => {
        let WithoutFirstSpace = removeSpace(input.value);
        if (input.name === "login" && WithoutFirstSpace.length >= 6) {
            return removeClass(input);
        }
        if (input.name === "password" && WithoutFirstSpace.length >= 6) {
            return removeClass(input);
        }
    });
});


function verifyUser() {
    let inputsAreValid;
    inputsAreValid = addErrorClass(inputs);
    if (inputsAreValid) {
        const formData = Object.fromEntries(
            new FormData(document.getElementById("loginForm")).entries()
        );
        let foundRegistredUser = users.find(
            (user) =>
                user.login === formData.login &&
                user.password === formData.password
        );
        if (foundRegistredUser) {
            users.forEach(user => user.isLogged = false);
            foundRegistredUser.language = document.getElementById("language").value;
            foundRegistredUser.isLogged = true;
            localStorage.setItem("users", JSON.stringify(users));
            window.location = "../home/home.html";
        } else {
            inputs.forEach(
                (input) =>
                    (input.parentElement.classList = "form-group hasError")
            );
        }
    }
}
function onSignIn(googleUser) {
    users.forEach(user => user.isLogged = false);

    const name = googleUser.getBasicProfile().getGivenName();
    const lastname = googleUser.getBasicProfile().getFamilyName();
    const login = googleUser.getBasicProfile().getEmail();
    const password = googleUser.getBasicProfile().getId();
    const img = googleUser.getBasicProfile().getImageUrl();
    const foundRegistredUser = users.find(user => user.login === login);
    if (foundRegistredUser) {
        foundRegistredUser.language = document.getElementById("language").value;
        foundRegistredUser.isLogged = true;
    } else {
        users.push({ img, name, lastname, login, password, language: document.getElementById("language").value, isLogged: true });
    }
    localStorage.setItem("users", JSON.stringify(users));
    window.location = "../home/home.html";
}

loginForm.addEventListener("submit", (e) => {
    verifyUser();
    e.preventDefault();
});

