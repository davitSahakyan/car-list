const inputs = Array.from(document.getElementsByClassName("form-control"));

const form = document.getElementById("form");
const loginForm = document.getElementById("loginForm");

const removeSpace = (string) => string.replace(/\s+/, "");

let users = JSON.parse(localStorage.getItem("users")) || [];

const removeClass = (element) => {
    element.parentElement.classList.remove("hasError");
    return true;
}
const addClass = (element) => {
    element.parentElement.classList = "form-group hasError";
}

const addErrorClass = (inputs) => {
    let inputsAreValid = true;
    inputs.forEach((input) => {
        if (input.name === "login" && input.value.length < 6) {
            addClass(input)
            inputsAreValid = false
        }
        if (input.name === "name" && input.value.length <= 2) {
            input.parentElement.classList = "form-group hasError";
            addClass(input)
            inputsAreValid = false
        }
        if (input.name === "lastname" && input.value.length <= 2) {
            addClass(input)
            inputsAreValid = false
        }
        if (input.name === "password" && input.value.length < 6) {
            addClass(input)
            inputsAreValid = false
        }
    });
    return inputsAreValid
};

inputs.forEach((input) => {
    input.addEventListener("textInput", () => {
        let WithoutFirstSpace = removeSpace(input.value);
        if (input.name === "login" && WithoutFirstSpace.length >= 6) {
            return removeClass(input)
        }
        if (input.name === "name" && WithoutFirstSpace.length >= 2) {
            return removeClass(input)
        }
        if (input.name === "lastname" && WithoutFirstSpace.length >= 2) {
            return removeClass(input)
        }
        if (input.name === "password" && WithoutFirstSpace.length >= 6) {
            return removeClass(input)
        }
    });
});

const validation = () => {
    let canCreateUser = false;
    let inputsAreValid;
    inputsAreValid = addErrorClass(inputs);
    if (inputsAreValid) {
        let loginInput = inputs.find((input) => input.name === "login");
        if (users.length) {
            canCreateUser = !Boolean(users.find(user => user.login === loginInput.value && loginInput.name === "login"))
        } else {
            canCreateUser = true;
        }
    }
    if (inputsAreValid && !canCreateUser) {
        let loginInput = inputs.find((input) => input.name === "login");
        loginInput.parentElement.classList = "form-group hasError";
    }
    if (canCreateUser) {
        console.log("inputsAreValid", inputsAreValid);
        const formData = Object.fromEntries(
            new FormData(document.getElementById("form")).entries()
        );
        users.push(formData);
        localStorage.setItem("users", JSON.stringify(users));
        alert("you have successfully registered");
        window.location = "./home.html";
    }
};

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
            window.location = "./home.html";
        } else {
            inputs.forEach(
                (input) =>
                    (input.parentElement.classList = "form-group hasError")
            );
        }
    }
};

if (form) {
    form.addEventListener("submit", (e) => {
        validation();
        e.preventDefault();
    });
}
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        verifyUser();
        e.preventDefault();
    });
}