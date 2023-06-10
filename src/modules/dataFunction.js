const saveData = (tasks) => {
  localStorage.setItem('tasks_data', JSON.stringify(tasks));
};

const loadData = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks_data')) || [];
  return tasks;
};

const addTask = (task) => {
  const dataTask = loadData();
  dataTask.push(task);
  saveData(dataTask);
};

const deleteTask = (idTask) => {
  const dataTask = loadData();
  const newDataTask = dataTask.filter((task) => task.element.id !== idTask);
  saveData(newDataTask);
};

const updateTask = (idTask, newContent) => {
  const dataTask = loadData();
  const task = dataTask.find((task) => (task.element.id === idTask));
  task.description = newContent.description;
  saveData(dataTask);
};

export {
  addTask, deleteTask, updateTask, saveData, loadData,
};