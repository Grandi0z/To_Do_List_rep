import './style.css';
import { populateTask, renderTask, checkTextContent } from './modules/viewFunction.js';

const taskList = document.querySelector('.tasks_list');

window.onload = () => {
  renderTask(taskList);
};

// Add a task listener
const inputInsertTask = document.querySelector('.input_insert_task');
const btnAddTask = document.querySelector('.btn_add_task');
btnAddTask.addEventListener('click', () => {
  const description = checkTextContent(inputInsertTask.value.trim());
  if (description) {
    populateTask(description, taskList);
    inputInsertTask.value = '';
  }
});

// Remove a Task listener
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('trash') || e.target.parentElement.classList.contains('trash')) {
    renderTask(taskList);
  }
});