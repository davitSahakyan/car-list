import { carData } from './data.js'
import * as helpers from './helpers.js'


const dataWithId = carData.map( item => {
  return {...item , id : helpers.randomIdGenerator()}
})
let data = JSON.parse(localStorage.getItem("data")) || [...dataWithId]

const list = document.getElementById("carList");
const pagination = document.getElementById("pagination")
const pageChangeButtons = Array.from(document.getElementsByClassName("pageChange"))
const listElements = Array.from(document.getElementsByClassName("listElement"))
const deleteBtnContainer = document.getElementById("deleteButtonContainer")
const modalElement = document.getElementById("modalElement")
// FORM ELEMENT
const carForm = document.getElementById("carForm")
// Drag
const draggables = Array.from(document.getElementsByClassName("draggable"))
// Car container
const carAddContainer = document.getElementById("carAddContainer")


let currentPage = 1;
const itemsPerPage = 10;
let pagesCount = Math.ceil(data.length / itemsPerPage)

// Creates modal deletes choosen element and saves new array in local storage
const openDeleteModal = (id) => {
  modalElement.innerHTML = ""
  helpers.createModal()
  const modal = document.getElementById("myModal")
  modal.style.display = "block";

  const deleteButton = document.getElementById("deleteButton")
  const cancelButton = document.getElementById("cancelButton")
  cancelButton.addEventListener("click", () => {
  modal.style.display = "none"
    })

  window.onclick = function (event) {
    if (event.target == modal) {
       modal.style.display = "none";
    }
  }

  deleteButton.addEventListener("click" , () => {
   data = data.filter( item => {
       return item.id !== id
    })
    modal.style.display = "none"
    localStorage.setItem("data", JSON.stringify(data));
    let buttonColections = Array.from(document.getElementsByClassName("btn"))
    if(data.length % itemsPerPage === 0 && currentPage === buttonColections.length){
      currentPage = currentPage - 1
      showPagination(data, pagination, itemsPerPage);
      showList(data, list, itemsPerPage, currentPage); 
    }else {
      showList(data, list, itemsPerPage, currentPage);
      showPagination(data, pagination, itemsPerPage);
    }
  })
}


const showList = (items, wrapper, itemsPerPage, page) => {
  listElements.forEach(element => element.innerHTML = '')
  deleteBtnContainer.innerHTML = ""
  page--;

  let startItem = itemsPerPage * page;
  let endItem = startItem + itemsPerPage;
  let paginationItems = items.slice(startItem, endItem)

  for (let element = 0; element < listElements.length; element++) {
    const span = document.createElement("span");
    span.classList = `${listElements[element].id} headerSpan`
    span.textContent = `${listElements[element].id}`
    listElements[element].appendChild(span)
    for (let i = 0; i < paginationItems.length; i++) {
      let listItem = paginationItems[i]
      const span = document.createElement("span");
      span.textContent = `${listItem[listElements[element].id]}`
      listElements[element].appendChild(span)
    }
  }

  const addIconTag = document.createElement("i")
  addIconTag.classList = "fa fa-plus iconTag"
  addIconTag.addEventListener("click" , () => {
    carAddContainer.classList.remove("displayNone")
    carAddContainer.classList.add("opened")
  })
  deleteBtnContainer.appendChild(addIconTag)

  for( let i = 0 ; i < paginationItems.length ; i++){
    const id =  `${paginationItems[i].id}`
    const iTag = document.createElement("i");
    iTag.setAttribute( "data-id" ,  `${paginationItems[i].id}`)
    iTag.classList = "deleteButton fa fa-trash-o"
    iTag.addEventListener("click" , () =>{
       openDeleteModal(id)
    })
    deleteBtnContainer.appendChild(iTag)
  }
}

draggables.forEach(draggable => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging")
  })

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging")
  })
})

list.addEventListener("dragover", (e) => {
  e.preventDefault()
  const afterElement = getDragAfterElement(list, e.clientX)
  const draggable = document.querySelector(".dragging");
  const actions = Array.from(document.getElementsByClassName("action"));
  const afterEl = afterElement == null ? actions[0] : afterElement;
  list.insertBefore(draggable, afterEl)

})

function getDragAfterElement(list, x) {
  const draggableElements = [...list.querySelectorAll(".draggable:not(.dragging)")]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = x - box.left - box.width / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}


const singlePaginationButton = (page) => {
  let button = document.createElement("button");
  button.textContent = page;
  button.classList.add("btn")
  if (page === currentPage) button.classList.add("active")

  button.addEventListener("click", () => {
    currentPage = page;
    showList(data, list, itemsPerPage, currentPage);

    const buttonColection = document.getElementsByClassName("active")[0];
    buttonColection.classList.remove("active");

    button.classList.add("active")
  })

  return button
}

const showPagination = wrapper => {
  wrapper.innerHTML = '';
  pagination.innerHTML = "";
  pagesCount = Math.ceil(data.length / itemsPerPage)

  for (let i = 1; i < pagesCount + 1; i++) {
    let button = singlePaginationButton(i)
    pagination.appendChild(button)
  }

}

pageChangeButtons.forEach(item => {
  item.addEventListener("click", (e) => {
    if (e.currentTarget.id === 'INCREMENT' && currentPage < pagesCount) {
      currentPage = currentPage + 1;
      showList(data, list, itemsPerPage, currentPage)
    } else if (e.currentTarget.id === 'DECREMENT' && currentPage > 1) {
      currentPage = currentPage - 1;
      showList(data, list, itemsPerPage, currentPage)
    }

    let buttonColections = Array.from(document.getElementsByClassName("btn"))
    const activeButton = buttonColections.find((item) => {
      return item.textContent == currentPage
    })
    const buttonColection = document.getElementsByClassName("active")[0];
    buttonColection.classList.remove("active");

    activeButton.classList.add("active")

  })
})

const addClass = (element) => {
  element.parentElement.classList = "form-group hasError";
}
const removeClass = (element) => {
  element.parentElement.classList.remove("hasError")
}

const addErrorClass = (inputs) => {
  let inputsAreValid = true;
  inputs.forEach((input) => {
      if (input.value.length === 0) {
          addClass(input)
          inputsAreValid = false
      }
  });
  return inputsAreValid
};

if (carForm) {
  carForm.addEventListener("submit", (e) => {
    const inputs = Array.from(document.getElementsByClassName("form-control"));
    let inputsAreValid = addErrorClass(inputs)
    if(inputsAreValid){
      alert("Car created")
       const formData = Object.fromEntries(
      new FormData(document.getElementById("carForm")).entries()
     );
      const formDataWithId =  {...formData , id : helpers.randomIdGenerator()}
      data = [...data , formDataWithId]
      localStorage.setItem("data", JSON.stringify(data));
      showList(data, list, itemsPerPage, currentPage);
      showPagination(data, pagination, itemsPerPage)
      // close add car div
      carAddContainer.classList.remove("opened");
      carAddContainer.classList.add("displayNone");   
    }
    e.preventDefault();
  });
}

showList(data, list, itemsPerPage, currentPage)
showPagination(data, pagination, itemsPerPage)


