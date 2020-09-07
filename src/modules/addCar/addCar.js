import { carData } from "../data.js";
import * as utils from "../utils.js";
import { eng } from "../langData/eng.js";
import { rus } from "../langData/rus.js";
import { arm } from "../langData/arm.js";
import * as services from "../services.js";

const lang = services.languageObject(eng, rus, arm);

const changeLanguage = (lang) => {
    document.getElementById("submitButton").textContent = `${lang.create}`;
};
changeLanguage(lang);

const DATA_WITH_ID = carData.map(item => {
    return { ...item, id: utils.randomIdGenerator() };
});
let data = JSON.parse(localStorage.getItem("data")) || [...DATA_WITH_ID];

const carForm = document.getElementById("carForm");

// Add new car
if (carForm) {
    carForm.addEventListener("submit", (e) => {
        const inputs = Array.from(document.getElementsByClassName("form-control"));
        let inputsAreValid = utils.addErrorClass(inputs);
        if (inputsAreValid) {
            alert("Car created");
            const formData = Object.fromEntries(
                new FormData(document.getElementById("carForm")).entries()
            );
            const formDataWithId = { ...formData, id: utils.randomIdGenerator() };
            data = [...data, formDataWithId];
            localStorage.setItem("data", JSON.stringify(data));
            location.assign("../carList/carList.html");
        }
        e.preventDefault();
    });
}
