
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("tasks-list");

// Load tasks on page load
window.onload = loadTasks;

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    const taskObj = {
        text: taskText,
        completed: false
    };

    createTaskElement(taskObj);
    saveTask(taskObj);

    input.value = "";
}

function createTaskElement(taskObj) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskObj.text;

    // Double click to edit
    span.addEventListener("dblclick", function () {
        const newText = prompt("Edit your task:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
            updateLocalStorage();
        }
    });

    // Completed Button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.style.marginLeft = "10px";
    completeBtn.addEventListener("click", () => {
        li.classList.toggle("completed");
        taskObj.completed = !taskObj.completed;
        updateLocalStorage();
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateLocalStorage();
    });

    if (taskObj.completed) {
        li.classList.add("completed");
    }

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function saveTask(taskObj) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task));
}

function updateLocalStorage() {
    const allTasks = [];
    const listItems = taskList.querySelectorAll("li");

    listItems.forEach(li => {
        const text = li.querySelector("span").textContent;
        const completed = li.classList.contains("completed");

        allTasks.push({ text, completed });
    });

    localStorage.setItem("tasks", JSON.stringify(allTasks));
}
