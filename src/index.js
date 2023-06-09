import './style.css';

const tasksList = document.getElementById('tasks_list');
const btnDeleteAll = document.createElement('button');

const arrTask = [
  {
    description: 'task n 1',
    completed: true,
    index: 1,
  },
  {
    description: 'task n 2',
    completed: false,
    index: 2,
  },
  {
    description: 'task n 3',
    completed: true,
    index: 3,
  },
];

const populateTask = (task) => {
  const taskItem = document.createElement('div');
  const checkValue = task.completed;
  const checkedBtn = (checkValue) => {
    if (!checkValue) {
      return '';
    }
    return 'checked';
  };

  const taskItemContent = `
    <div class="task_item" draggable='true'>
        <input class="form-check-input task_item_check" type="checkbox" value="" id="flexCheckChecked" ${checkedBtn(checkValue)}>
        <p class="task_item_text" contenteditable>${task.description}</p>
        <button class="btn btn-outline-secondary task_item_btn"><i class="bi bi-three-dots-vertical"></i></button>
        <button class="btn btn-outline-secondary tast_item_btn_trash"><i class="bi bi-trash3-fill"></i></button>
    </div>
   `;
  taskItem.innerHTML = taskItemContent;
  tasksList.appendChild(taskItem);
};

window.onload = () => {
  arrTask.forEach((task) => {
    populateTask(task);
  });
  if (arrTask) {
    btnDeleteAll.setAttribute('type', 'button');
    btnDeleteAll.setAttribute('class', 'btn btn-outline-primary btn_clear_all_completed_tasks');
    btnDeleteAll.innerText = 'Clear all clompleted';
    tasksList.appendChild(btnDeleteAll);
  }
};