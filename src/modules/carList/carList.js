import { carData } from "../data.js";
import * as utils from "../utils.js";

const DATA_WITH_ID = carData.map(item => {
  return { ...item, id: utils.randomIdGenerator() };
});
let data = JSON.parse(localStorage.getItem("data")) || localStorage.setItem("data", JSON.stringify([...DATA_WITH_ID]));


const list = document.getElementById("carList");
const pagination = document.getElementById("pagination");
const pageChangeButtons = Array.from(document.getElementsByClassName("pageChange"));
const listElements = Array.from(document.getElementsByClassName("listElement"));
const deleteBtnContainer = document.getElementById("deleteButtonContainer");
const modalElement = document.getElementById("modalElement");
const draggables = Array.from(document.getElementsByClassName("draggable"));


let currentPage = 1;
const itemsPerPage = 10;
let pagesCount = Math.ceil(data.length / itemsPerPage);

// Creates modal deletes choosen element and saves new array in local storage

const openDeleteModal = (id) => {
  modalElement.innerHTML = "";
  utils.createModal(modalElement);
  const modal = document.getElementById("myModal");
  modal.style.display = "block";

  const deleteButton = document.getElementById("deleteButton");
  const cancelButton = document.getElementById("cancelButton");
  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  deleteButton.addEventListener("click", () => {
    data = data.filter(item => {
      return item.id !== id;
    });
    modal.style.display = "none";
    localStorage.setItem("data", JSON.stringify(data));
    let buttonColections = Array.from(document.getElementsByClassName("btn"));
    if (data.length % itemsPerPage === 0 && currentPage === buttonColections.length) currentPage = currentPage - 1;
    showList(data, list, itemsPerPage, currentPage);
    showPagination(data, pagination, itemsPerPage);
  });
};
// EDIT CLICKED ELEMENT ////////////////////////////////////////////////////////////
const editClickedCarElement = (id) => {
  location.assign("../edit/edit.html?id=" + id);
};

// Showlist starts here
const showList = (items, wrapper, itemsPerPage, page) => {
  listElements.forEach(element => element.innerHTML = "");
  deleteBtnContainer.innerHTML = "";
  page--;

  let startItem = itemsPerPage * page;
  let endItem = startItem + itemsPerPage;
  let paginationItems = items.slice(startItem, endItem);

  for (let element = 0; element < listElements.length; element++) {
    const span = document.createElement("span");
    span.classList = `${listElements[element].id} headerSpan`;
    span.textContent = `${listElements[element].id}`;
    listElements[element].appendChild(span);
    for (let i = 0; i < paginationItems.length; i++) {
      let listItem = paginationItems[i];
      const span = document.createElement("span");
      span.textContent = `${listItem[listElements[element].id]}`;
      listElements[element].appendChild(span);
    }
  }
  // Add car button
  const addIconTag = document.createElement("i");
  const span = document.createElement("span");
  addIconTag.classList = "fa fa-plus iconTag";
  span.textContent = " ";
  addIconTag.addEventListener("click", () => {
    location.assign("../addCar/addCar.html");
  });
  deleteBtnContainer.appendChild(addIconTag);
  deleteBtnContainer.appendChild(span);

  // Add delete button and edit button and their events
  for (let i = 0; i < paginationItems.length; i++) {
    const id = `${paginationItems[i].id}`;
    const editTag = document.createElement("i");
    const iTag = document.createElement("i");
    iTag.setAttribute("data-id", `${paginationItems[i].id}`);
    editTag.setAttribute("data-id", `${paginationItems[i].id}`);
    iTag.classList = "deleteButton carDeleteButton fa fa-trash-o";
    editTag.classList = "editButton fa fa-edit";
    iTag.addEventListener("click", () => {
      openDeleteModal(id);
    });
    editTag.addEventListener("click", () => {
      editClickedCarElement(id);
    });
    deleteBtnContainer.appendChild(iTag);
    deleteBtnContainer.appendChild(editTag);
  }

  draggables.forEach(draggable => {
    // Add class dragging on dragstart
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    // Remove class dragging on dragend
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });
  // insert dragging element before after element
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(list, e.clientX);
    const draggable = document.querySelector(".dragging");
    const actions = Array.from(document.getElementsByClassName("action"));
    const afterEl = afterElement == null ? actions[0] : afterElement;
    list.insertBefore(draggable, afterEl);
  });
};

// gets drag after element
function getDragAfterElement(list, x) {
  const draggableElements = [...list.querySelectorAll(".draggable:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = x - box.left - box.width / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

//  creates single pagination button and recives event click
const singlePaginationButton = (page) => {
  let button = document.createElement("button");
  button.textContent = page;
  button.classList.add("btn");
  if (page === currentPage) button.classList.add("active");

  button.addEventListener("click", () => {
    currentPage = page;
    showList(data, list, itemsPerPage, currentPage);

    const buttonColection = document.getElementsByClassName("active")[0];
    buttonColection.classList.remove("active");

    button.classList.add("active");
  });

  return button;
};
// creates pagination using  singlePaginationButton
const showPagination = wrapper => {
  wrapper.innerHTML = "";
  pagination.innerHTML = "";
  pagesCount = Math.ceil(data.length / itemsPerPage);

  for (let i = 1; i < pagesCount + 1; i++) {
    let button = singlePaginationButton(i);
    pagination.appendChild(button);
  }

};
// next and prev page buttons 
const nextAndPrev = () => {
  pageChangeButtons.forEach(item => {
    item.addEventListener("click", (e) => {
      if (e.currentTarget.id === "INCREMENT" && currentPage < pagesCount) {
        currentPage = currentPage + 1;
        showList(data, list, itemsPerPage, currentPage);
      } else if (e.currentTarget.id === "DECREMENT" && currentPage > 1) {
        currentPage = currentPage - 1;
        showList(data, list, itemsPerPage, currentPage);
      }

      let buttonColections = Array.from(document.getElementsByClassName("btn"));
      const activeButton = buttonColections.find((item) => {
        return item.textContent == currentPage;
      });
      const buttonColection = document.getElementsByClassName("active")[0];
      buttonColection.classList.remove("active");

      activeButton.classList.add("active");

    });
  });
};
nextAndPrev();


showList(data, list, itemsPerPage, currentPage);
showPagination(data, pagination, itemsPerPage);
