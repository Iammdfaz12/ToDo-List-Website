const taskAddButton = document.getElementById("taskAddButton");
const taskInput = document.getElementById("taskInputField");
const taskLists = document.querySelector(".task-lists");
const progressBar = document.getElementById("taskProgress");

document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTaskList();
    updatedTaskStats();
  }
});

let tasks = [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Add task 
const addTask = () => {
  const task = taskInput.value.trim();

  if (task) {
    tasks.push({ text: task, completed: false });
    taskInput.value = "";
  }

  updateTaskList();
  updatedTaskStats();
  saveTasks();
};

// Add button funtionality
taskAddButton.addEventListener("click", function (event) {
  event.preventDefault();
  addTask();
});

// Toggle the completed tasks
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updatedTaskStats();
  saveTasks();
};

// Delete tasks
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updatedTaskStats();
  saveTasks();
};

// Edit tasks
const editTask = (index) => {
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTaskList();
  updatedTaskStats();
  saveTasks();
};

// Update task statistics
const updatedTaskStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;
  progressBar.style.width = `${progress}%`;

  document.getElementById(
    "taskNumbers"
  ).textContent = `${completedTasks} / ${totalTasks}`;

  if (tasks.length && completedTasks === totalTasks) {
    blastConfetti();
  }
};

// Update task list
const updateTaskList = () => {
  taskLists.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input 
            type="checkbox" 
            class="checkbox" 
            ${task.completed ? "checked" : ""}  
            onchange="toggleTaskComplete(${index})" />

          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./assets/edit.png" onClick="editTask(${index})" style="cursor: pointer" alt="Edit task" />
          <img src="./assets/bin.png" onClick="deleteTask(${index})" style="cursor: pointer" alt="Delete task" />
        </div>
      </div>
    `;
    taskLists.append(listItem);
  });
};



const blastConfetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
