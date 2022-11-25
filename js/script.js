'use strict';

// find selector
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// array date tasks
let tasks = [];

// localStorage check
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    // render Array
    tasks.forEach(item => renderArray(item));
}

checkEmptyList()

// handler ToDo add
form.addEventListener('submit', addTask);
// handler ToDo done
tasksList.addEventListener('click', doneTask);
// handler Todo delete
tasksList.addEventListener('click', deleteTask);

// func ToDo Add
function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value;

    // add tasks to array
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };
    tasks.push(newTask);

    // render Task
    renderArray(newTask);

    taskInput.value = '';
    taskInput.focus();

    checkEmptyList();
    saveToLocalStorage();
}

// func ToDo delete
function deleteTask(event) {
    let target = event.target;

    if (target.id === 'emptyList') {
        target.stopPropagation();
    }

    if (target.dataset.action === 'delete') {
        const parentNode = target.closest('.list-group-item');

        // find index array
        const id = Number(parentNode.id);
        const index = tasks.findIndex((item) => item.id === id);
        // delete Array
        tasks.splice(index, 1);

        parentNode.remove();
    }

    checkEmptyList();
    saveToLocalStorage();
}

// func ToDo done
function doneTask(event) {
    let target = event.target;

    if (target.dataset.action === 'done') {
        const parentNode = target.closest('.list-group-item');

        // array find done
        const id = Number(parentNode.id);
        const task = tasks.find(item => item.id === id);
        task.done = !task.done;

        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');
    }

    saveToLocalStorage();
}

// func examination delete tasks
function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
            <li id="emptyList" class="list-group-item empty-list">
                <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                <div class="empty-list__title">Список дел пуст</div>
            </li>
        `;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    } else {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

// save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// func render Task
function renderArray(tasks) {
    const cssClass = tasks.done ? "task-title task-title--done" : "task-title";

    const taskHTML = `
        <li id='${tasks.id}' class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${tasks.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>
    `;

    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}