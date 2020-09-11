import { carData } from "../data.js";
import * as utils from "../utils.js";
import * as services from "../services.js";

// Language part
function changeLanguage(lang) {
  document.getElementById("submitButton").textContent = `${lang.create}`;
}
services.languageObject().then((res) => changeLanguage(res));
// Language part

const DATA_WITH_ID = carData.map((item) => {
  return { ...item, id: utils.randomIdGenerator() };
});
let data = JSON.parse(localStorage.getItem("data")) || [...DATA_WITH_ID];

const carForm = document.getElementById("carForm");
let formDataWithId = {};
class Car {
  constructor(formDataWithId) {
    this.Brand = formDataWithId.Brand;
    this.Class = formDataWithId.Class;
    this.Date = formDataWithId.Date;
    this.Model = formDataWithId.Model;
    this.Transmission = formDataWithId.Transmission;
    this.Horsepower = formDataWithId.Horsepower;
  }
}

// Add new car
if (carForm) {
  carForm.addEventListener("submit", (e) => {
    const inputs = Array.from(document.getElementsByClassName("form-control"));
    console.log(inputs);
    let inputsAreValid = utils.addErrorClass(inputs);
    if (inputsAreValid) {
      alert("Car created");
      const formData = Object.fromEntries(
        new FormData(document.getElementById("carForm")).entries()
      );
      formDataWithId = { ...formData, id: utils.randomIdGenerator() };
      let newCar = new Car(formDataWithId);
      data = [...data, newCar];
      localStorage.setItem("data", JSON.stringify(data));
      location.assign("../carList/carList.html");
    }
    e.preventDefault();
  });
}
