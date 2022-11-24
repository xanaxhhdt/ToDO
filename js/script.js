'use strict';

// find selector
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

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

    const taskHTML = `
        <li class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${taskText}</span>
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
        target.closest('.list-group-item').remove();
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


