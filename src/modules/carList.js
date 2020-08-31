import { carData } from './data.js'

let data = carData;

const list = document.getElementById("carList");
const pagination = document.getElementById("pagination")
const pageChangeButtons = Array.from(document.getElementsByClassName("pageChange"))
const listElements = Array.from(document.getElementsByClassName("listElement"))

// Drag
const draggables = Array.from(document.getElementsByClassName("draggable"))

const arrayOfKeys = [...Object.keys(data[0])]

let currentPage = 1;
const itemsPerPage = 10;

const pagesCount = Math.ceil(data.length / itemsPerPage)

const createModal = () => {
  const modalContainer = document.createElement("div")
  const modalContent = document.createElement("div")
  const textContainer = document.createElement("p")
  const deleteButton = document.createElement("button")
  const cancelButton = document.createElement("button")

  textContainer.textContent = "Are you sure you want to delete?";
  deleteButton.textContent = "Delete"
  cancelButton.textContent = "Cancel"

  modalContainer.classList = "modal"
  modalContainer.id = "myModal"
  modalContent.classList = "modal-content"
  deleteButton.classList = "deleteButton"
  deleteButton.id = "deleteButton"
  cancelButton.classList = "cancelButton"
  cancelButton.id = "cancelButton"

  modalContent.appendChild(textContainer)
  modalContent.appendChild(deleteButton)
  modalContent.appendChild(cancelButton)

  modalContainer.appendChild(modalContent)

  const rootElement = document.getElementById("root")
  rootElement.appendChild(modalContainer)

}
createModal()

const showList = (items, wrapper, itemsPerPage, page) => {
  listElements.forEach(element => element.innerHTML = '')
  page--;

  let startItem = itemsPerPage * page;
  let endItem = startItem + itemsPerPage;
  let paginationItems = items.slice(startItem, endItem)



  for (let element = 0; element < listElements.length; element++) {
    const span = document.createElement("span");
    span.classList = `${listElements[element].id}`
    span.textContent = `${listElements[element].id}`
    listElements[element].appendChild(span)
    for (let i = 0; i < paginationItems.length; i++) {
      let listItem = paginationItems[i]
      const span = document.createElement("span");
      span.textContent = `${listItem[listElements[element].id]}`
      listElements[element].appendChild(span)
    }
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
  if (afterElement == null) {
    list.appendChild(draggable)
  } else {
    list.insertBefore(draggable, afterElement)
  }
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

const deleteButtons = Array.from(document.getElementsByClassName("deleteBtn"))
deleteButtons.forEach(button => {
  button.addEventListener("click", () => {
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

    deleteButton.addEventListener("click", () => {
      const newCarData = data.filter((car, index) => {
        return index !== Number(button.id)
      })
      data = [...newCarData];
      showList(data, list, itemsPerPage, currentPage);
    })
  })
})




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

showList(data, list, itemsPerPage, currentPage)
showPagination(data, pagination, itemsPerPage)


