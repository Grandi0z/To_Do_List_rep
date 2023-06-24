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

const deleteTask = (idTask,parent=false) => {
  const dataTask = localStorageMock.getItem()
  const newDataTask = dataTask.filter((task) => task.id !== idTask);
  localStorageMock.setItem("task",newDataTask)
  if(parent){
    const liElt = document.getElementById(idTask)
    liElt.parentNode.removeChild(liElt)
  }
};


export {localStorageMock, addTask, deleteTask}

