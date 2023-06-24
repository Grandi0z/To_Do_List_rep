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

describe("Add and a remove a <li> element",()=>{
  it('should add one new item to the list', () => {
    document.body.innerHTML =
    '<div>' +
    '  <ul id="list"><li></li></ul>' +
    '</div>';
    const task3 = new Task("task 4", false, 4)
    const container = document.querySelector('#list')
    addTask(task3,container)
    const list = document.querySelectorAll('#list li');
    expect(list).toHaveLength(2);
  });
  it('should remove a item to the list', () => {
    document.body.innerHTML =
    '<div>' +
    '  <ul id="list"><li></li> <li id="11"></li></ul>' +
    '</div>';
    const task4 = new Task("task 3", false, 3)
    task4.id="11"
    addTask(task4)
    const container = document.querySelector('#list')
    deleteTask("11",container)
    const list = document.querySelectorAll('#list li');
    expect(list).toHaveLength(1);
  });
})