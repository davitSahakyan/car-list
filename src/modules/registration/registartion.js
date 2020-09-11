const LOGIN_FILL_UP_ERROR_TEXT = "Please fill up your login";
const LOGIN_USER_EXISTS_TEXT = "User with this login exists";
const NAME_FILL_UP_TEXT = "Please fill up your name";
const LASTNAME_FILL_UP_TEXT = "Please fill up your lastname";
const PASSWORD_FILL_UP_TEXT = "Please fill up your password";

const inputs = Array.from(document.getElementsByClassName("form-control"));

const form = document.getElementById("form");

const removeSpace = (string) => string.replace(/\s+/, "");

let users = JSON.parse(localStorage.getItem("users")) || [];

function removeClass(element) {
  const errorSpans = element.parentElement.getElementsByClassName("errorSpan");
  if (errorSpans) {
    Array.from(errorSpans).forEach((item) => item.remove());
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
    Array.from(document.getElementsByClassName("errorSpan")).forEach((item) =>
      item.remove()
    );
  }
  inputs.forEach((input) => {
    if (input.name === "login" && input.value.length < 6) {
      addErrorSpan(input, LOGIN_FILL_UP_ERROR_TEXT);
      inputsAreValid = false;
    }
    if (input.name === "name" && input.value.length <= 2) {
      addErrorSpan(input, NAME_FILL_UP_TEXT);
      inputsAreValid = false;
    }
    if (input.name === "lastname" && input.value.length <= 2) {
      addErrorSpan(input, LASTNAME_FILL_UP_TEXT);
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
    if (input.name === "name" && WithoutFirstSpace.length >= 2) {
      return removeClass(input);
    }
    if (input.name === "lastname" && WithoutFirstSpace.length >= 2) {
      return removeClass(input);
    }
    if (input.name === "password" && WithoutFirstSpace.length >= 6) {
      return removeClass(input);
    }
  });
});

function validation() {
  let canCreateUser = false;
  let inputsAreValid;
  inputsAreValid = addErrorClass(inputs);
  if (inputsAreValid) {
    let loginInput = inputs.find((input) => input.name === "login");
    if (users.length) {
      canCreateUser = !users.find(
        (user) => user.login === loginInput.value && loginInput.name === "login"
      );
    } else {
      canCreateUser = true;
    }
  }
  if (inputsAreValid && !canCreateUser) {
    let loginInput = inputs.find((input) => input.name === "login");
    addErrorSpan(loginInput, LOGIN_USER_EXISTS_TEXT);
  }
  if (canCreateUser) {
    const formData = Object.fromEntries(
      new FormData(document.getElementById("form")).entries()
    );
    users.push({
      ...formData,
      language: document.getElementById("language").value,
      type: "custom",
    });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...formData,
        language: document.getElementById("language").value,
        type: "custom",
      })
    );
    alert("you have successfully registered");
    window.location = "./src/modules/home/home.html";
  }
}

form.addEventListener("submit", (e) => {
  validation();
  e.preventDefault();
});
