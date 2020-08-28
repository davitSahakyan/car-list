import { carData } from './data.js'

localStorage.setItem("data", JSON.stringify(carData));
const data = JSON.parse(localStorage.getItem("data"));

const list = document.getElementById("carList");
const pagination = document.getElementById("pagination")
const header = document.getElementById("header")
const pageChangeButtons = Array.from(document.getElementsByClassName("pageChange"))


const arrayOfColores = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6']

let currentPage = 1;
const itemsPerPage = 10;

const pagesCount = Math.ceil(data.length / itemsPerPage)

const showList = (items, wrapper, itemsPerPage, page, header) => {
  wrapper.innerHTML = "",
    header.innerHTML = ""
  page--;

  let id = 0
  let startItem = itemsPerPage * page;
  let endItem = startItem + itemsPerPage;
  let paginationItems = items.slice(startItem, endItem)

  Object.keys(data[0]).forEach(item => {
    const span = document.createElement("span");
    span.textContent = `${item}`
    span.classList.add(arrayOfColores[id])
    header.appendChild(span)
    id = id + 1
  });

  for (let i = 0; i < paginationItems.length; i++) {
    let listItem = paginationItems[i]
    const listItemElement = document.createElement("div");
    listItemElement.classList = "listElement"
    Object.keys(listItem).forEach(item => {
      const span = document.createElement("span");
      span.textContent = `${listItem[item]}`
      listItemElement.appendChild(span)
    });
    list.appendChild(listItemElement)
  }
}

const singlePaginationButton = (page) => {
  let button = document.createElement("button");
  button.textContent = page;
  button.classList.add("btn")
  if (page === currentPage) button.classList.add("active")

  button.addEventListener("click", () => {
    currentPage = page;
    showList(data, list, itemsPerPage, currentPage, header);

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
    console.log(e.currentTarget)
    if (e.currentTarget.id === 'INCREMENT' && currentPage < pagesCount) {
      currentPage = currentPage + 1;
      showList(data, list, itemsPerPage, currentPage, header)
    } else if (e.currentTarget.id === 'DECREMENT' && currentPage > 1) {
      currentPage = currentPage - 1;
      showList(data, list, itemsPerPage, currentPage, header)
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

showList(data, list, itemsPerPage, currentPage, header)
showPagination(data, pagination, itemsPerPage)