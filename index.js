const arr = [];
const form = document.querySelector("#form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const btnSub = document.querySelector("#btnSub");

retrieveFormValue = (event) => {
  event.preventDefault();
  createObj();
  console.log(title.value);
  console.log(arr);
};

const createObj = () => {
  arr.push({
    title: title.value,
    description: description.value,
  });
};

form.addEventListener("submit", retrieveFormValue);
