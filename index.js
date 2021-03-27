const arr = [];
const form = document.querySelector("#form");
const board = document.querySelector("#board");
const btnSub = document.querySelector("#btnSub");
const btnEdit = document.querySelector("#btnEdit");
const btnInProgress = document.querySelector("#btnInProgress");
const btnDelete = document.querySelector("#btnDelete");

retrieveFormValue = (event) => {
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
  <div id="box">
    <h2>Deleted</h2>
    <input type="text"></input>
  </div>
</div>
    `;
  });
};

board.addEventListener("click", (event) => {
  const elem = event.target.closest("#boxToDo");
  const title = elem.querySelector(".title");
  const description = elem.querySelector(".description");
  let newObj = {
    title: title.value,
    description: description.value,
    data: new Date(),
  };
  console.log(newObj);
});

form.addEventListener("submit", retrieveFormValue);
