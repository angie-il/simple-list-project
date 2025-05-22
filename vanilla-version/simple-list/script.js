const addButton = document.getElementById("addButton");
const addModal = document.getElementById("addModal");
const cancelButton = document.getElementById("cancelAdd");
const confirmAdd = document.getElementById("confirmAdd");
const itemInput = document.getElementById("itemInput");
const list = document.getElementById("list");
const deleteButton = document.getElementById("deleteButton");
const undoButton = document.getElementById("undoDelete");

let lastDeletedText = null;
let lastDeletedIndex = null;

function saveListToStorage() {
  const items = Array.from(document.querySelectorAll("#list li")).map(
    (li) => li.textContent
  );
  localStorage.setItem("myListItems", JSON.stringify(items));
}

function loadListFromStorage() {
  const items = JSON.parse(localStorage.getItem("myListItems")) || [];
  items.forEach((text) => addItemToList(text));
}

function addItemToList(value, position = null) {
  const li = document.createElement("li");
  li.textContent = value;

  li.addEventListener("click", () => {
    document
      .querySelectorAll("#list li")
      .forEach((item) => item.classList.remove("selected"));
    li.classList.add("selected");
  });

  li.addEventListener("dblclick", () => {
    const confirmDelete = confirm(
      `Are you sure you want to delete "${li.textContent}"?`
    );
    if (!confirmDelete) return;

    const index = Array.from(list.children).indexOf(li);
    lastDeletedText = li.textContent;
    lastDeletedIndex = index;
    li.remove();
    saveListToStorage();
  });

  const listItems = document.querySelectorAll("#list li");
  if (position === null || position >= listItems.length) {
    list.appendChild(li);
  } else {
    list.insertBefore(li, listItems[position]);
  }

  saveListToStorage();
}

addButton.addEventListener("click", () => {
  addModal.classList.remove("hidden");
  itemInput.focus();
});

cancelButton.addEventListener("click", () => {
  addModal.classList.add("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") addModal.classList.add("hidden");
});

itemInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") confirmAdd.click();
});

confirmAdd.addEventListener("click", () => {
  let value = itemInput.value.trim();
  if (value === "") return;

  addItemToList(value);
  itemInput.value = "";
  addModal.classList.add("hidden");
});

deleteButton.addEventListener("click", () => {
  const selectedItem = document.querySelector("#list li.selected");
  if (selectedItem) {
    const items = Array.from(document.querySelectorAll("#list li"));
    const index = items.indexOf(selectedItem);

    lastDeletedText = selectedItem.textContent;
    lastDeletedIndex = index;

    selectedItem.remove();
    document
      .querySelectorAll("#list li")
      .forEach((li) => li.classList.remove("selected"));
    saveListToStorage();
  }
});

undoButton.addEventListener("click", () => {
  if (lastDeletedText !== null && lastDeletedIndex !== null) {
    addItemToList(lastDeletedText, lastDeletedIndex);
    lastDeletedText = null;
    lastDeletedIndex = null;
  }
});

loadListFromStorage();
