const arr = [];
const arrDelete = [];
const form = document.querySelector("#form");
const board = document.querySelector("#board");
const btnSub = document.querySelector("#btnSub");
const modal = document.getElementById("modalWrapper");
const okEditBtn = document.getElementById("okEditBtn");
const span = document.getElementById("closeBtn");
let elemIndex;

retrieveFormValue = (event) => {
  const btnEdit = document.querySelector("#btnEdit");
  const btnInProgress = document.querySelector("#btnInProgress");
  const btnDelete = document.querySelector("#btnDelete");
  event.preventDefault();
  createObj();
  drawBoard();
  console.log(arr);
};

const createObj = () => {
  arr.push({
    title: title.value,
    description: description.value,
  });
};

const drawBoard = () => {
  board.innerHTML = "<h1 id='titleProgress'>Progress</h1>";
  arr.forEach((item) => {
    board.innerHTML += `
    <div id="wrapper_box">
  <div id="boxToDo">
    <h2>To Do</h2>
    <input class="title" type="text" value="${item.title}"></input>
    <input class="description" type="text" value="${item.description}"></input>
    <button id="btnEdit"></button>
    <button id="btnInProgress"></button>
    <button id="btnDelete"></button>
  </div>
  <div id="box">
    <h2>In Progress</h2>
    <input type="text"></input>
  </div>
  <div id="box">
    <h2>Done</h2>
    <input type="text"></input>
  </div>
  <div id="boxDelete">
    <h2>Deleted</h2>
  </div>
</div>
    `;
  });
};

board.addEventListener("click", (event) => {
  const elemTodo = event.target.closest("#boxToDo");
  const elemDelete = event.target.closest("#boxDelete");
  const title = elemTodo.querySelector(".title");
  const description = elemTodo.querySelector(".description");
  let newObj = {
    title: title.value,
    description: description.value,
    data: new Date(),
  };
  if (event.target.id === "btnEdit") {
    drawModal(newObj);
  } else if (event.target.id === "btnDelete") {
  }
  console.log(arr);
});

const drawModal = (newObj) => {
  modalContend.innerHTML = `
  <input id="editTitle" value="${newObj.title}"></input>
  <input id="editDescription" value="${newObj.description}"></input>
    `;
  modal.style.display = "block";
};

const drawBoxDelete = (newObj) => {
  boxDelete.innerHTML = `
    <h2>Deleted</h2>
    <input id="editTitle" value="${newObj.title}"></input>
    <input id="editDescription" value="${newObj.description}"></input>`;
};

okEditBtn.addEventListener("click", () => {
  let editTitle = document.querySelector("#editTitle");
  let editDescription = document.querySelector("#editDescription");
  let newObjEdit = {
    title: editTitle.value,
    description: editDescription.value,
    data: new Date(),
  };
  arr.splice(elemIndex, 1, newObjEdit);
  drawBoard();
  modal.style.display = "none";
});

form.addEventListener("submit", retrieveFormValue);

span.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
