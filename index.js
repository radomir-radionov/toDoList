const data = {
  todo: [],
  arrDelete: [],
  arrInProgress: [],
  arrDone: [],
};
const form = document.querySelector("#form");
const board = document.querySelector("#board");
const modal = document.getElementById("modalWrapper");
const span = document.getElementById("closeBtn");
const boxToDo = document.querySelector("#boxToDo");
const boxInProgress = document.querySelector("#boxInProgress");
const boxDelete = document.querySelector("#boxDelete");
const boxDone = document.querySelector("#boxDone");
let elemIndex;

retrieveFormValue = (event) => {
  event.preventDefault();
  createObj();
  drawBoard(boxToDo, "todo");
};

const createObj = () => {
  data.todo.push({
    title: title.value,
    description: description.value,
  });
};

const drawBoard = (desk, deskName) => {
  desk.innerHTML = "";
  data[deskName].forEach((item) => {
    desk.innerHTML += `
    <div id="formEdit">
    <h3>Title: <span class="title">${item.title}</span></h3>
    <h3>Description: <span class="description">${item.description}</span></h3>
    <div class=btnBox>
    ${
      deskName === "arrInProgress"
        ? `<button id="btnDone" class="btn">&#10004</i></button>`
        : ``
    }
    ${
      deskName === "arrDelete" ||
      deskName === "arrDone" ||
      deskName === "arrInProgress"
        ? ""
        : `
        <button id="btnInProgress" class="btn">&#10004</i></button>
        <button id="btnDelete" class="btn">&#10005</i></button>
        <button id="btnEdit" class="btn">&#9998</i></button>`
    }
    </div>
    <hr>
    </div>
    `;
  });
};

board.addEventListener("click", (event) => {
  const elem = event.target.closest("#formEdit");
  const title = elem.querySelector(".title");
  const description = elem.querySelector(".description");
  let newObj = {
    title: title.textContent,
    description: description.textContent,
  };
  if (event.target.id === "btnEdit") {
    data.todo.forEach((item, index) => {
      if (item.title === newObj.title) {
        elemIndex = index;
      }
    });
    drawModal(newObj);
  } else if (event.target.id === "btnDelete") {
    changeArr(newObj, data.todo, data.arrDelete);
    drawBoard(boxToDo, "todo");
    drawBoard(boxDelete, "arrDelete");
  } else if (event.target.id === "btnInProgress") {
    changeArr(newObj, data.todo, data.arrInProgress);
    drawBoard(boxToDo, "todo");
    drawBoard(boxInProgress, "arrInProgress");
  } else if (event.target.id === "btnDone") {
    changeArr(newObj, data.arrInProgress, data.arrDone);
    drawBoard(boxInProgress, "arrInProgress");
    drawBoard(boxDone, "arrDone");
  }
  console.log(data.todo);
  console.log(data.arrInProgress);
  console.log(data.arrDone);
  console.log(data.arrDelete);
});

const changeArr = (newObj, outputDesk, inputDesk) => {
  outputDesk.forEach((item, index) => {
    if (item.title === newObj.title) {
      outputDesk.splice(index, 1);
      inputDesk.push(item);
    }
  });
};

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
  data.todo.splice(elemIndex, 1, newObjEdit);
  drawBoard(boxToDo, "todo");
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

form.addEventListener("submit", retrieveFormValue);
