import * as services from "../services.js";

const changeLanguage = (lang) => {
    document.getElementById("carListLink").textContent = lang.carList;
    document.getElementById("addCarLink").textContent = lang.addCar;
};

services.languageObject().then(res => changeLanguage(res));
