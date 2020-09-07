const inputs = Array.from(document.getElementsByClassName("form-control"));

const loginForm = document.getElementById("loginForm");

const removeSpace = (string) => string.replace(/\s+/, "");

let users = JSON.parse(localStorage.getItem("users")) || [];

const removeClass = (element) => {
    element.parentElement.classList.remove("hasError");
    return true;
};

const addErrorSpan = (element, spanContent) => {
    const errorSpan = document.createElement("span");
    errorSpan.classList = "errorSpan";
    errorSpan.textContent = spanContent;
    element.parentElement.appendChild(errorSpan);
};

const addErrorClass = (inputs) => {
    let inputsAreValid = true;
    inputs.forEach((input) => {
        if (input.name === "login" && input.value.length < 6) {
            addErrorSpan(input);
            inputsAreValid = false;
        }
        if (input.name === "password" && input.value.length < 6) {
            addErrorSpan(input);
            inputsAreValid = false;
        }
    });
    return inputsAreValid;
};

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


const verifyUser = () => {
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
};

loginForm.addEventListener("submit", (e) => {
    verifyUser();
    e.preventDefault();
});