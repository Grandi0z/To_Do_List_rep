import {localStorageMock, addTask, deleteTask} from "./util.js"
import Task from "../task.js"

jest.mock('../task.js')



describe("Save and Delete to Local storage",()=>{
  afterEach(() => {
   localStorageMock.setItem('task', []);
  });
  it("Should save in local storage",()=>{
    const task1 = new Task("task 2", false,2)    
    addTask(task1)
    expect(localStorageMock.setItem).toHaveBeenCalledWith("task",[task1])
  });
  it("Should delete a item in local storage",()=>{
    const task2 = new Task("task 2", false,2)
    task2.id=11
    addTask(task2)  
    deleteTask(11)
    //the calls[0] is the first test(it) calls[1] is in afterEach and here the call 2
    expect(localStorageMock.setItem.mock.calls[2][1]).toContain(task2)
    expect(localStorageMock.setItem.mock.calls[3][1]).not.toContain(task2)
  });
})

