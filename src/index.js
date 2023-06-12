import './style.css';
import {
  populateTask, renderTasks, checkTextContent, removeCompletedTask, disableBtnAllClear,
} from './modules/viewFunction.js';

const taskList = document.querySelector('.tasks_list');
const btnAllClearChecked = document.querySelector('.btn_clear_all_completed_tasks');
const inputInsertTask = document.querySelector('.input_insert_task');
const btnAddTask = document.querySelector('.btn_add_task');

window.onload = () => {
  renderTasks(taskList);
  disableBtnAllClear(btnAllClearChecked);
};

// Add a task listener

btnAddTask.addEventListener('click', () => {
  const description = checkTextContent(inputInsertTask.value.trim());
  if (description) {
    populateTask(description, taskList);
    inputInsertTask.value = '';
    disableBtnAllClear(btnAllClearChecked);
  }
});

// Remove a Task listener
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('trash') || e.target.parentElement.classList.contains('trash')) {
    renderTasks(taskList);
    disableBtnAllClear(btnAllClearChecked);
  }
});

// Clear all checked tasks
btnAllClearChecked.addEventListener('click', () => {
  removeCompletedTask();
  renderTasks(taskList);
  disableBtnAllClear(btnAllClearChecked);
});