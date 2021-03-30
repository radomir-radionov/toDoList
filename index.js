const arr = [];
const arrDelete = [];
const arrInProgress = [];
const form = document.querySelector("#form");
const board = document.querySelector("#board");
const btnSub = document.querySelector("#btnSub");
const modal = document.getElementById("modalWrapper");
const okEditBtn = document.getElementById("okEditBtn");
const span = document.getElementById("closeBtn");
let elemIndex;
const boxToDo = document.getElementById("boxToDo");
const boxInProgress = document.getElementById("boxInProgress");
const boxDelete = document.getElementById("boxDelete");

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
  boxToDo.innerHTML = "";
  arr.forEach((item) => {
    boxToDo.innerHTML += `
    <div id="formEdit">
    <h3>Title: <span class="title">${item.title}</span></h3>
    <h3>Description: <span class="description">${item.description}</span></h3>
    <div class=btnBox>
    <button id="btnInProgress" class="btn">&#10004</i></button>
    <button id="btnDelete" class="btn">&#10005</i></button>
    <button id="btnEdit" class="btn">&#9998</i></button> 
    </div>
    <hr>
    </div>
    `;
  });
};

board.addEventListener("click", (event) => {
  // const elemTodo = event.target.closest("#boxToDo");
  // const elemDelete = event.target.closest("#boxDelete");
  const elem = event.target.closest("#formEdit");
  const title = elem.querySelector(".title");
  const description = elem.querySelector(".description");
  let newObj = {
    title: title.textContent,
    description: description.textContent,
    data: new Date(),
  };
  if (event.target.id === "btnEdit") {
    arr.forEach((item, index) => {
      if (item.title === newObj.title) {
        elemIndex = index;
      }
    });
    drawModal(newObj);
  } else if (event.target.id === "btnDelete") {
    arr.forEach((item, index) => {
      if (item.title === newObj.title) {
        arr.splice(index, 1);
        arrDelete.push(item);
        drawBoard();
        drawBoxDelete(newObj);
      }
    });
  } else if (event.target.id === "btnInProgress") {
    arr.forEach((item, index) => {
      if (item.title === newObj.title) {
        arr.splice(index, 1);
        arrInProgress.push(item);
        drawBoard();
        drawInProgress(newObj);
      }
    });
  }
  console.log(arr);
  console.log(arrDelete);
  console.log(arrInProgress);
});

const drawModal = (newObj) => {
  modalContend.innerHTML = `
  <input id="editTitle" value="${newObj.title}"></input>
  <input id="editDescription" value="${newObj.description}"></input>
    `;
  modal.style.display = "block";
};

okEditBtn.addEventListener("click", () => {
  let editTitle = document.querySelector("#editTitle");
  let editDescription = document.querySelector("#editDescription");
  let newObjEdit = {
    title: editTitle.value,
    description: editDescription.value,
  };
  arr.splice(elemIndex, 1, newObjEdit);
  drawBoard();
  modal.style.display = "none";
});

span.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

const drawInProgress = (newObj) => {
  boxInProgress.innerHTML += `
    <h3>Title: <span class="title">${newObj.title}</span></h3>
    <h3>Description: <span class="description">${newObj.description}</span></h3>
    <div class=btnBox>
    <button id="btnInProgress" class="btn">&#10004</i></button>
    </div>
    <hr>`;
};

const drawBoxDelete = (newObj) => {
  boxDelete.innerHTML += `
    <h3>Title: <span class="title">${newObj.title}</span></h3>
    <h3>Description: <span class="description">${newObj.description}</span></h3>`;
};

form.addEventListener("submit", retrieveFormValue);
