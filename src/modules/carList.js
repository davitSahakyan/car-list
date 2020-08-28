import { data } from './data.js'

const list = document.getElementById("carList");
const pagination = document.getElementById("pagination")

let currentPage = 1;
const itemsPerPage = 6;

const showList = (items, wrapper, itemsPerPage, page) => {
  wrapper.innerHTML = "",
    page--;

  let startItem = itemsPerPage * page;
  let endItem = startItem + itemsPerPage;
  let paginationItems = items.slice(startItem, endItem)

  for (let i = 0; i < paginationItems.length; i++) {
    let listItem = paginationItems[i]
    const listItemElement = document.createElement("div");
    listItemElement.classList = "listElement"
    Object.keys(listItem).forEach(item => {
      const span = document.createElement("span");
      span.textContent = `${item} : ${listItem[item]}`
      listItemElement.appendChild(span)
    });
    list.appendChild(listItemElement)
  }
}

const singlePaginationButton = (page) => {
  let button = document.createElement("button");
  button.textContent = page;
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

const showPagination = (items, wrapper, itemsPerPage) => {
  wrapper.innerHTML = '';

  const pagesCount = Math.ceil(items.length / itemsPerPage)
  for (let i = 1; i < pagesCount + 1; i++) {
    let button = singlePaginationButton(i)
    pagination.appendChild(button)
  }

}

showList(data, list, itemsPerPage, currentPage)
showPagination(data, pagination, itemsPerPage)