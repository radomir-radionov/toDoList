const arr = [];
const arrDelete = [];
const arrInProgress = [];
const arrDone = [];
const form = document.querySelector("#form");
const board = document.querySelector("#board");
const modal = document.getElementById("modalWrapper");
const span = document.getElementById("closeBtn");
let elemIndex;

retrieveFormValue = (event) => {
  event.preventDefault();
  createObj();
  drawBoard();
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
  const elem = event.target.closest("#formEdit");
  const title = elem.querySelector(".title");
  const description = elem.querySelector(".description");
  let newObj = {
    title: title.textContent,
    description: description.textContent,
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
    arrName = arrInProgress;
    arr.forEach((item, index) => {
      if (item.title === newObj.title) {
        arr.splice(index, 1);
        arrInProgress.push(item);
        drawBoard();
        drawInProgress();
      }
    });
  } else if (event.target.id === "btnDone") {
    arrInProgress.forEach((item, index) => {
      if (item.title === newObj.title) {
        arrInProgress.splice(index, 1);
        arrDone.push(item);
        drawInProgress(newObj);
        drawDone(newObj);
      }
    });
  }
  console.log(arr);
  console.log(arrInProgress);
  console.log(arrDone);
  console.log(arrDelete);
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

const drawInProgress = () => {
  boxInProgress.innerHTML = "";
  arrInProgress.forEach((newObj) => {
    boxInProgress.innerHTML += `
    <div id="formEdit">
  <h3>Title: <span class="title">${newObj.title}</span></h3>
  <h3>Description: <span class="description">${newObj.description}</span></h3>
  <div class=btnBox>
  <button id="btnDone" class="btn">&#10004</i></button>
  </div>
  <hr>
  </div>
    `;
  });
};

const drawDone = (newObj) => {
  boxDone.innerHTML += `
    <h3>Title: <span class="title">${newObj.title}</span></h3>
    <h3>Description: <span class="description">${newObj.description}</span></h3>
    <hr>`;
};

const drawBoxDelete = (newObj) => {
  boxDelete.innerHTML += `
    <h3>Title: <span class="title">${newObj.title}</span></h3>
    <h3>Description: <span class="description">${newObj.description}</span></h3>
    <hr>`;
};

form.addEventListener("submit", retrieveFormValue);
