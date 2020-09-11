import * as services from "../services.js";

const locale = JSON.parse(localStorage.getItem("currentUser"));
const signOut = document.getElementById("signOut");
const carListBtn = document.getElementById("carListBtn");
const addCarBtn = document.getElementById("addCarBtn");

const changeLanguage = (lang) => {
  carListBtn.textContent = lang.carList;
  addCarBtn.textContent = lang.addCar;
};
addCarBtn.addEventListener("click", () => {
  location.assign("../addCar/addCar.html");
});
carListBtn.addEventListener("click", () => {
  location.assign("../carList/carList.html");
});

services.languageObject().then((res) => changeLanguage(res));

gapi.load("auth2", function () {
  gapi.auth2.init();
});

signOut.addEventListener("click", function signOut() {
  localStorage.removeItem("currentUser");
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    window.location = "../login/login.html";
  });
});

function createUserInfoBlock() {
  if (locale) {
    console.log(locale);
    const userInfoBlock = document.getElementById("userInfoBlock");
    const wrapper = document.createElement("div");
    if (locale.type === "facebook" || locale.type === "google") {
      const img = document.createElement("img");
      img.src = locale.img;
      wrapper.appendChild(img);
    }
    const email = document.createElement("span");

    wrapper.classList.add("userInfoWrraper");
    email.textContent = `${locale.login}`;

    wrapper.appendChild(email);
    userInfoBlock.appendChild(wrapper);
  }
}
createUserInfoBlock();
