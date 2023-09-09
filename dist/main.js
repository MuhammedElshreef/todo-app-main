const switchTheme = document.getElementById("theme-switch");
const bgImage = document.getElementById("bg-image");
const addInput = document.getElementById("add-task-input");
const completeCheck = document.getElementById("Complete-check");
const todoUl = document.getElementById("todo-ul");
const root = document.querySelector(":root");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const addBtn = document.getElementById("add-btn");
let todoObj = {
  iD: Date.now(),
  todoName: "",
  completed: false,
};
let todoArr = [];
if (systemTheme) {
  localStorage.setItem("theme", "dark");
}
if (localStorage.getItem("theme") === "dark") {
  switchTheme.checked = true;
  document.documentElement.classList.add("dark");
  bgImage.className =
    "bg-[url(images/bg-desktop-dark.jpg)] bg-cover pb-24 pt-16";
} else {
  switchTheme.checked = false;
  document.documentElement.classList.remove("dark");
  bgImage.className =
    "bg-[url(images/bg-desktop-light.jpg)] bg-cover pb-24 pt-16";
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
    todoArr.push(todoObj);
    localStorage.setItem("task", JSON.stringify(todoArr));
    createItems(todoObj);
  }
});
function createItems(todo) {
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
    "h-12 w-full px-8 flex justify-between items-center gap-4 bg-white first:rounded-t-lg last:rounded-b-lg dark:bg-[#25273C]  group cursor-pointer";
  const stateCheck = document.createElement("input");
  stateCheck.className =
    "h-6 w-6 rounded-full text-teal-500 focus:ring-transparent focus:ring-offset-0 bg-transparent cursor-pointer";
  if (todo.completed == true) {
    stateCheck.checked = true;
  }
  stateCheck.type = "checkbox";
  const todoTitle = document.createElement("p");
  todoTitle.className = "dark:text-gray-300";
  todoTitle.innerText = todo.todoName;
  removeBtn.appendChild(crossIcon);
  infoDiv.appendChild(stateCheck);
  infoDiv.appendChild(todoTitle);
  todoLi.appendChild(infoDiv);
  todoLi.appendChild(removeBtn);
  todoUl.appendChild(todoLi);
}
function deleteEle(task) {
  todoArr = JSON.parse(localStorage.getItem("task"));
  const element = todoArr.find((element) => element.iD === task.iD);
  const indexOfTask = todoArr.indexOf(element);
  todoArr.splice(indexOfTask, 1);
  localStorage.setItem("task", JSON.stringify(todoArr));
}
