// DOM elements
const todoTab = document.getElementById('todo-tab');
const prioritiesTab = document.getElementById('priorities-tab');
const completedTab = document.getElementById('completed-tab');
const todoSection = document.getElementById('todo-section');
const prioritiesSection = document.getElementById('priorities-section');
const completedSection = document.getElementById('completed-section');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const dueDateInput = document.getElementById('due-date');
const taskList = document.getElementById('task-list');
const highPriorityList = document.getElementById('high-priority-list');
const mediumPriorityList = document.getElementById('medium-priority-list');
const lowPriorityList = document.getElementById('low-priority-list');
const completedList = document.getElementById('completed-list');

// Store tasks
let tasks = [];

// Active tab highlighting
function setActiveTab(tab) {
    todoTab.classList.remove('active-tab');
    prioritiesTab.classList.remove('active-tab');
    completedTab.classList.remove('active-tab');

    tab.classList.add('active-tab');
}

// Show sections
function showSection(section) {
    todoSection.style.display = 'none';
    prioritiesSection.style.display = 'none';
    completedSection.style.display = 'none';

    section.style.display = 'block';
}

// Tab navigation
todoTab.addEventListener('click', () => {
    setActiveTab(todoTab);
    showSection(todoSection);
});

prioritiesTab.addEventListener('click', () => {
    setActiveTab(prioritiesTab);
    showSection(prioritiesSection);
    renderPriorities();
});

completedTab.addEventListener('click', () => {
    setActiveTab(completedTab);
    showSection(completedSection);
    renderCompletedTasks();
});

// Add task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = {
        name: taskInput.value,
        priority: prioritySelect.value,
        dueDate: dueDateInput.value,
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    prioritySelect.value = 'high';
    dueDateInput.value = '';
    renderTasks();
});

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';

    tasks.filter(task => !task.completed).forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const priorityDot = document.createElement('span');
        priorityDot.classList.add('priority-dot', task.priority);
        taskItem.appendChild(priorityDot);

        const taskText = document.createElement('span');
        taskText.textContent = `${task.name} - Due: ${task.dueDate}`;
        taskItem.appendChild(taskText);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete-btn');
        completeButton.addEventListener('click', () => {
            task.completed = true;
            renderTasks();
        });
        taskItem.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
        });
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

// Render priorities
function renderPriorities() {
    highPriorityList.innerHTML = '';
    mediumPriorityList.innerHTML = '';
    lowPriorityList.innerHTML = '';

    tasks.filter(task => !task.completed).forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.name} - Due: ${task.dueDate}`;

        if (task.priority === 'high') {
            highPriorityList.appendChild(taskItem);
        } else if (task.priority === 'medium') {
            mediumPriorityList.appendChild(taskItem);
        } else if (task.priority === 'low') {
            lowPriorityList.appendChild(taskItem);
        }
    });
}

// Render completed tasks
function renderCompletedTasks() {
    completedList.innerHTML = '';

    tasks.filter(task => task.completed).forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.name} - Completed`;

        completedList.appendChild(taskItem);
    });
}

// Initialize
setActiveTab(todoTab);
showSection(todoSection);
renderTasks();

  
  


