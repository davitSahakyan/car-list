import * as services from "../services.js";

const signOut = document.getElementById("signOut");

const changeLanguage = (lang) => {
    document.getElementById("carListLink").textContent = lang.carList;
    document.getElementById("addCarLink").textContent = lang.addCar;
};

services.languageObject().then(res => changeLanguage(res));

gapi.load("auth2", function () {
    gapi.auth2.init();
});

signOut.addEventListener("click", function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        window.location = "../login/login.html";
    });
});
