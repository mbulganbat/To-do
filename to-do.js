// to-do.js

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const footer = document.querySelector(".footer");

let tasks = [];
let currentFilter = "All";

function renderTasks() {
  let filteredTasks = tasks.filter((task) => {
    if (currentFilter === "Active") return !task.completed;
    if (currentFilter === "Completed") return task.completed;
    return true;
  });

  let taskList = document.querySelector(".taskList");

  if (!taskList) {
    taskList = document.createElement("div");
    taskList.classList.add("taskList");
    const header = document.querySelector(".header");
    header.insertAdjacentElement("afterend", taskList);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<div class="emptyMsg">No tasks yet. Add one above!</div>`;
  } else {
    let html = "";
    filteredTasks.forEach((task) => {
      html += `
        <div class="taskItem ${task.completed ? "completed" : ""}">
          <input 
            type="checkbox" 
            ${task.completed ? "checked" : ""} 
            onchange="toggleTask(${task.id})" 
          />
          <span>${task.text}</span>
          <button class="deleteBtn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;
    });
    taskList.innerHTML = html;
  }

  renderFooter();
}

function renderFooter() {
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  footer.innerHTML = `
    <span>${completedCount} of ${totalCount} tasks completed</span>
    <button onclick="clearCompleted()">Clear completed</button>
  `;
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false,
  });

  taskInput.value = "";
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

const filterButtons = document.querySelectorAll(".filterContainer button");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.textContent;
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderTasks();
  });
});

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// Эхлэхэд
renderTasks();
