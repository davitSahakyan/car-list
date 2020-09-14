import * as utils from "../utils.js";
import * as services from "../services.js";

const carEditButton = document.getElementById("editButton");

function changeLanguage(lang) {
  carEditButton.textContent = `${lang.edit}`;
}
const language = new services.Language();
language.languageObject().then((res) => changeLanguage(res));
// Language part end

const id = window.location.search.split("=")[1];
const localStorageData = JSON.parse(localStorage.getItem("data"));
const car = localStorageData.find((item) => {
  return item.id === id;
});
const inputs = Array.from(document.getElementsByClassName("edit-form-control"));
inputs.forEach((input, index) => {
  input.value = Object.values(car)[index];
});

function editButton() {
  let inputsAreValid = utils.addErrorClass(inputs).inputsAreValid;
  if (inputsAreValid) {
    const formData = Object.fromEntries(
      new FormData(document.getElementById("carEditForm")).entries()
    );
    const editedlocalStorageData = localStorageData.map((item) => {
      if (item.id === id) {
        return { ...formData, id: id };
      } else {
        return item;
      }
    });
    localStorage.setItem("data", JSON.stringify(editedlocalStorageData));
  }
}
carEditButton.addEventListener("click", (e) => {
  editButton();
  e.preventDefault();
});
