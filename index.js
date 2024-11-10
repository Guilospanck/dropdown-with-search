const SELECT_OPTIONS = ["potato", "larry", "jesus"];

let isOpened = false;

function dropdownClick(e) {
  e.preventDefault();
  // prevent click to go into inner z-indexes (overlay, for example)
  e.stopPropagation();

  const container = document.getElementById("container");
  const dropdown = document.getElementById("dropdown");
  const button = document.getElementById("button");
  const input = document.getElementById("input");

  container.classList.toggle("container-deselected");
  dropdown.classList.toggle("show");
  button.classList.toggle("button-up");

  if (isOpened) {
    button.textContent = "v";
  } else {
    addOptionsToListAndListListener();
    button.textContent = "^";
  }

  input.value = "";
  isOpened = !isOpened;
}

function inputChangeEvent({ target: { value } }) {
  addOptionsToListAndListListener(value);
}

function listItemSelectHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById("selected").textContent = e.target.innerText;
}

function addOptionsToListAndListListener(filterBy = null) {
  const list = document.getElementById("list");
  list.innerHTML = null;

  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.width = "100%";

  const li = document.createElement("li");
  li.classList.add("lilist");

  SELECT_OPTIONS.filter((item) =>
    filterBy ? item.includes(filterBy) : true,
  ).forEach((opt) => {
    const ul = document.createElement("ul");
    ul.textContent = opt;
    ul.classList.add("listoption");
    ul.addEventListener("click", listItemSelectHandler);
    li.appendChild(ul);
  });

  div.appendChild(li);
  list.appendChild(div);
}

function addEventListeners() {
  const overlay = document.getElementById("overlay");
  const container = document.getElementById("container");
  const dropdown = document.getElementById("dropdown");
  const input = document.getElementById("input");

  overlay.addEventListener("click", dropdownClick);
  container.addEventListener("click", dropdownClick);
  dropdown.addEventListener("click", (e) => e.stopPropagation());
  input.addEventListener("change", inputChangeEvent);
}

window.addEventListener("DOMContentLoaded", () => {
  addOptionsToListAndListListener();
  addEventListeners();
});
