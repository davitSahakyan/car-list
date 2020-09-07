import { eng } from "../langData/eng.js";
import { rus } from "../langData/rus.js";
import { arm } from "../langData/arm.js";
import * as services from "../services.js";

const lang = services.languageObject(eng, rus, arm);

const changeLanguage = (lang) => {
    document.getElementById("carListLink").textContent = lang.carList;
    document.getElementById("addCarLink").textContent = lang.addCar;
};
changeLanguage(lang);
