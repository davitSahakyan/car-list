import * as utils from "../utils.js";
import { eng } from "../langData/eng.js";
import { rus } from "../langData/rus.js";
import { arm } from "../langData/arm.js";
import * as services from "../services.js";

const carEditButton = document.getElementById("editButton");

const lang = services.languageObject(eng, rus, arm);

const changeLanguage = (lang) => {
    carEditButton.textContent = `${lang.edit}`;
};
changeLanguage(lang);

const id = window.location.search.split("=")[1];
const localStorageData = JSON.parse(localStorage.getItem("data"));
const car = localStorageData.find(item => {
    return item.id === id;
});
const inputs = Array.from(document.getElementsByClassName("edit-form-control"));
inputs.forEach((input, index) => {
    input.value = Object.values(car)[index];
});

const editButton = () => {
    let inputsAreValid = utils.addErrorClass(inputs);
    if (inputsAreValid) {
        const formData = Object.fromEntries(
            new FormData(document.getElementById("carEditForm")).entries()
        );
        const editedlocalStorageData = localStorageData.map(item => {
            if (item.id === id) {
                return { ...formData, id: id };
            } else {
                return item;
            }
        });
        localStorage.setItem("data", JSON.stringify(editedlocalStorageData));
        location.assign("../carList/carList.html");
    }

};
carEditButton.addEventListener("click", (e) => {
    editButton();
    e.preventDefault();
});

