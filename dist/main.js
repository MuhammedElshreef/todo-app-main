let counter = 0;
const switchTheme = document.getElementById("theme-switch");
const bgImage = document.getElementById("bg-image");
const addInput = document.getElementById("add-task-input");
const completeCheck = document.getElementById("Complete-check");
const todoUl = document.getElementById("todo-ul");
const root = document.querySelector(":root");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const addBtn = document.getElementById("add-btn");
//
const mobileAllBtn = document.getElementById("mobile-all");
const mobileActiveBtn = document.getElementById("mobile-active");
const mobileCompletedBtn = document.getElementById("mobile-completed");
const filterDiv = document.createElement("div");
const mobileToggleDiv = document.getElementById("toggle-div");
filterDiv.setAttribute("id", "filter-div");
filterDiv.className =
  "dark:bg-[#25273C] order-last flex justify-between text-slate-400 py-2 px-4 rounded-b-lg";
const itemsLeft = document.createElement("p");
const toggleDiv = document.createElement("div");
toggleDiv.className = "lg:flex gap-4 hidden ";
const allBtn = document.createElement("button");
allBtn.innerText = `All`;
allBtn.className = "hover:text-white";
const activeBtn = document.createElement("button");
activeBtn.innerText = `Active`;
activeBtn.className = "hover:text-white";
const completedBtn = document.createElement("button");
completedBtn.innerText = `Completed`;
completedBtn.className = "hover:text-white";
const clearCompleteBtn = document.createElement("button");
clearCompleteBtn.innerText = `Clear Completed`;
clearCompleteBtn.className = "hover:text-white";
filterDiv.appendChild(itemsLeft);
toggleDiv.appendChild(allBtn);
toggleDiv.appendChild(activeBtn);
toggleDiv.appendChild(completedBtn);
filterDiv.appendChild(toggleDiv);
filterDiv.appendChild(clearCompleteBtn);
//
let todoObj = {
  iD: Date.now(),
  todoName: "",
  completed: false,
};
let todoArr = [];
if (systemTheme && !localStorage.getItem("theme") === "dark") {
  localStorage.setItem("theme", "dark");
}
if (localStorage.getItem("theme") === "dark") {
  switchTheme.checked = true;
  document.documentElement.classList.add("dark");
  bgImage.className =
    "lg:bg-[url(images/bg-desktop-dark.jpg)] bg-[url(images/bg-mobile-dark.jpg)] bg-cover pb-24 pt-16";
} else {
  switchTheme.checked = false;
  document.documentElement.classList.remove("dark");
  bgImage.className =
    "lg:bg-[url(images/bg-desktop-light.jpg)] bg-[url(images/bg-mobile-light.jpg)] bg-cover pb-24 pt-16";
}
switchTheme.addEventListener("change", () => {
  if (switchTheme.checked == true) {
    document.documentElement.classList.add("dark");
    bgImage.className =
      "bg-[url(images/bg-desktop-dark.jpg)] bg-cover pb-24 pt-16";
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    bgImage.className =
      "bg-[url(images/bg-desktop-light.jpg)] bg-cover pb-24 pt-16";
    localStorage.setItem("theme", "light");
  }
});
if (localStorage.getItem("task")) {
  todoArr = JSON.parse(localStorage.getItem("task"));
  todoArr.forEach((todo) => {
    createItems(todo);
  });
  if (!todoArr.length == 0) {
    counter = todoArr.length;
    itemsLeft.innerHTML = `<span>${counter}</span> items left`;
    todoUl.appendChild(filterDiv);
  }
  if (todoArr.length == 0) {
    mobileToggleDiv.classList.remove("flex");
    mobileToggleDiv.classList.add("hidden");
  }
}
addInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addBtn.click();
  }
});
addBtn.addEventListener("click", function () {
  if (addInput.value != "") {
    todoObj = {
      todoName: addInput.value,
      iD: Date.now(),
      completed: false,
    };
    if (completeCheck.checked == true) {
      todoObj.completed = true;
    }
    filterDiv.remove();
    counter = todoArr.length;
    itemsLeft.innerHTML = `<span>${counter + 1}</span> items left`;
    todoArr.push(todoObj);
    localStorage.setItem("task", JSON.stringify(todoArr));
    createItems(todoObj);
    todoUl.appendChild(filterDiv);
    addInput.value = "";
  }
  completeCheck.checked = false;
  //fix this
  mobileToggleDiv.classList.remove("hidden");
  mobileToggleDiv.classList.add("flex");
  console.log(mobileToggleDiv.className);
});
function createItems(todo) {
  const todoTitle = document.createElement("p");
  todoTitle.className = "dark:text-gray-300";
  todoTitle.innerText = todo.todoName;
  const todoLi = document.createElement("li");
  const crossIcon = document.createElement("img");
  crossIcon.setAttribute("src", "images/icon-cross.svg");
  crossIcon.className = "hidden group-hover:block ";
  var removeBtn = document.createElement("button");
  removeBtn.setAttribute("id", "delete-btn");
  removeBtn.addEventListener("click", function () {
    this.parentElement.remove();
    deleteEle(todo);
  });
  const infoDiv = document.createElement("div");
  infoDiv.className = "flex gap-8 items-center";
  todoLi.className =
    "h-12 w-full px-8 flex justify-between items-center gap-4 bg-white dark:bg-[#25273C] first:rounded-t-lg border-b-[0.5px] dark:border-gray-700 group cursor-pointer";
  const stateCheck = document.createElement("input");
  stateCheck.setAttribute("id", "state-check");
  stateCheck.className =
    "h-6 w-6 rounded-full text-teal-500 focus:ring-transparent focus:ring-offset-0 bg-transparent cursor-pointer";
  stateCheck.type = "checkbox";
  if (todo.completed == true) {
    stateCheck.checked = true;
  }
  removeBtn.appendChild(crossIcon);
  infoDiv.appendChild(stateCheck);
  infoDiv.appendChild(todoTitle);
  todoLi.appendChild(infoDiv);
  todoLi.appendChild(removeBtn);
  todoUl.appendChild(todoLi);
  stateCheck.addEventListener("change", function () {
    if (stateCheck.checked) {
      todoTitle.innerHTML = `<s class ="text-gray-400">${todo.todoName}</s>`;
      todoArr = JSON.parse(localStorage.getItem("task"));
      const element = todoArr.find((element) => element.iD === todo.iD);
      const indexOfTask = todoArr.indexOf(element);
      element.completed = true;
      todoArr.splice(indexOfTask, 1, element);
      localStorage.setItem("task", JSON.stringify(todoArr));
    } else {
      todoTitle.innerHTML = todo.todoName;
      const element = todoArr.find((element) => element.iD === todo.iD);
      const indexOfTask = todoArr.indexOf(element);
      element.completed = false;
      todoArr.splice(indexOfTask, 1, element);
      localStorage.setItem("task", JSON.stringify(todoArr));
    }
  });
  if (stateCheck.checked) {
    todoTitle.innerHTML = `<s class ="text-gray-400">${todo.todoName}</s>`;
  } else {
    todoTitle.innerHTML = todo.todoName;
  }
}
const lists = document.querySelectorAll("li");
function deleteEle(task) {
  todoArr = JSON.parse(localStorage.getItem("task"));
  const element = todoArr.find((element) => element.iD === task.iD);
  const indexOfTask = todoArr.indexOf(element);
  todoArr.splice(indexOfTask, 1);
  localStorage.setItem("task", JSON.stringify(todoArr));
  let items = document.querySelectorAll("#state-check");
  for (let i = 0; i <= items.length; i++) {
    if (items.length == 0) {
      filterDiv.remove();
      mobileToggleDiv.remove();
    }
  }
  counter = todoArr.length;
  itemsLeft.innerHTML = `<span>${counter}</span> items left`;
}
// need to edit this shitty code
clearCompleteBtn.addEventListener("click", () => {});
completedBtn.addEventListener("click", () => {
  let items = document.querySelectorAll("#state-check");
  for (let i = 0; i < items.length; i++) {
    items[i].parentElement.parentElement.classList.add("block");
    items[i].parentElement.parentElement.classList.remove("hidden");
  }
  for (let i = 0; i < items.length; i++) {
    if (!items[i].checked) {
      items[i].parentElement.parentElement.classList.add("hidden");
    }
  }
});
activeBtn.addEventListener("click", () => {
  let items = document.querySelectorAll("#state-check");
  for (let i = 0; i < items.length; i++) {
    items[i].parentElement.parentElement.classList.add("block");
    items[i].parentElement.parentElement.classList.remove("hidden");
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i].checked) {
      items[i].parentElement.parentElement.classList.add("hidden");
    }
  }
});
allBtn.addEventListener("click", () => {
  let items = document.querySelectorAll("#state-check");
  for (let i = 0; i < items.length; i++) {
    items[i].parentElement.parentElement.classList.add("block");
    items[i].parentElement.parentElement.classList.remove("hidden");
  }
});
mobileCompletedBtn.addEventListener("click", () => {
  let items = document.querySelectorAll("#state-check");
  for (let i = 0; i < items.length; i++) {
    items[i].parentElement.parentElement.classList.add("block");
    items[i].parentElement.parentElement.classList.remove("hidden");
  }
  for (let i = 0; i < items.length; i++) {
    if (!items[i].checked) {
      items[i].parentElement.parentElement.classList.add("hidden");
    }
  }
});
mobileActiveBtn.addEventListener("click", () => {
  let items = document.querySelectorAll("#state-check");
  for (let i = 0; i < items.length; i++) {
    items[i].parentElement.parentElement.classList.add("block");
    items[i].parentElement.parentElement.classList.remove("hidden");
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i].checked) {
      items[i].parentElement.parentElement.classList.add("hidden");
    }
  }
});
mobileAllBtn.addEventListener("click", () => {
  let items = document.querySelectorAll("#state-check");
  for (let i = 0; i < items.length; i++) {
    items[i].parentElement.parentElement.classList.add("block");
    items[i].parentElement.parentElement.classList.remove("hidden");
  }
});
