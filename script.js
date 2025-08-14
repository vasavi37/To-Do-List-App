// Get references to DOM elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

// Event listener for Add button
addBtn.addEventListener("click", addTask);

/* Function to add a new task */
function addTask() {
    let taskValue = taskInput.value.trim(); // remove extra spaces

    // Check if input is empty
    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new list item
    let li = document.createElement("li");
    li.innerHTML = `
        ${taskValue}
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    // Add the new task to the task list
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = "";

    // Save tasks to localStorage
    saveTasks();
}

/* Function to delete a task */
function deleteTask(button) {
    button.parentElement.remove(); // Remove the parent li
    saveTasks(); // Update localStorage
}

/* Function to save tasks to localStorage */
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push(li.firstChild.textContent.trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Function to load tasks from localStorage on page load */
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${task}
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Load saved tasks when page loads
loadTasks();