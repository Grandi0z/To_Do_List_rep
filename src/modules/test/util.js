const localStorageMock = {
   store:{},
   clear:jest.fn(),
   getItem:jest.fn().mockReturnValue([]),
   setItem:jest.fn(function(key, value) {return this.store[key] = String(value)}),
   removeItem:jest.fn(function(key) {return delete this.store[key]}),
   read:function (){return this}
}

const addTask = (task,parent=false)=>{
  const tasks = localStorageMock.getItem()
  tasks.push(task)
  localStorageMock.setItem("task",tasks)
  const liElt = document.createElement('li')
  if(parent){
    parent.appendChild(liElt)
  }
  
}
//use task instead of taskId because there is no id in the instances of the mocking class Task
const deleteTask = (idTask,parent=false) => {
  const dataTask = localStorageMock.getItem()
  const newDataTask = dataTask.filter((task) => task.id !== idTask);
  localStorageMock.setItem("task",newDataTask)
  if(parent){
    const liElt = document.getElementById(idTask)
    liElt.parentNode.removeChild(liElt)
  }
};

const updateTask = (idTask, newContent) => {
  const dataTask = localStorageMock.getItem()
  const task = dataTask.find((task) => (task.id === idTask));
  if (newContent.description) {
    task.description = newContent.description;
    // if completed === true or === false
  } else if (newContent.completed || !newContent.completed) {
    task.completed = newContent.completed;
  }
  localStorageMock.setItem("task",dataTask);
};

const removeCompletedTask = () => {
  const dataTask = localStorageMock.getItem()
  const newDataTask = dataTask.filter((task) => task.completed !== true);
  localStorageMock.setItem("task",newDataTask);
};


export {localStorageMock, addTask, deleteTask, updateTask, removeCompletedTask}

