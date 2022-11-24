'use strict';

// find selector
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// array date tasks
const tasks = [];

// handler ToDo add
form.addEventListener('submit', addTask);

// handler Todo delete
tasksList.addEventListener('click', deleteTask);

// handler ToDo done
tasksList.addEventListener('click', doneTask);


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

    // css Class
    const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

    const taskHTML = `
        <li id='${newTask.id}' class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${newTask.text}</span>
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

    taskInput.value = '';
    taskInput.focus();

    checkEmpty();
}

// func ToDo delete
function deleteTask(event) {
    let target = event.target;

    if (target.dataset.action === 'delete') {
        const parentNode = target.closest('.list-group-item');

        // find index array
        const id = Number(parentNode.id);
        const index = tasks.findIndex((item) => item.id === id);
        // delete Array
        tasks.splice(index, 1);

        parentNode.remove();
    }

    checkEmpty();
}

// func ToDo done
function doneTask(event) {
    let target = event.target;

    if (target.dataset.action === 'done') {
        const parentNode = target.closest('.list-group-item');
        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');
    }
}

// func examination delete tasks
function checkEmpty() {
    if (tasksList.children.length > 1) {
        emptyList.classList.add('none');
    } else {
        emptyList.classList.remove('none');
    }
}