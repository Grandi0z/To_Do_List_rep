import {
  localStorageMock, addTask, updateTask, removeCompletedTask,
} from './util.js';
import Task from '../task.js';

jest.mock('../task.js');

describe('Edit description, update completed', () => {
  afterEach(() => {
    localStorageMock.setItem('task', []);
  });
  it('Should edit task description', () => {
    const task1 = new Task();
    task1.description = 'task 2';
    task1.completed = false;
    task1.id = 11;
    addTask(task1);
    updateTask(11, { description: 'task 1.01' });
    expect(localStorageMock.setItem.mock.calls[1][1]).toEqual([{ completed: false, description: 'task 1.01', id: 11 }]);
  });
  it('should update the completed', () => {
    updateTask(11, { completed: true });
    expect(localStorageMock.setItem.mock.calls[1][1]).toEqual([{ completed: true, description: 'task 1.01', id: 11 }]);
  });
});

describe('Clear all completed', () => {
  afterEach(() => {
    localStorageMock.setItem('task', []);
  });
  it('clear all completed tasks', () => {
    const task1 = new Task();
    const task2 = new Task();
    const task3 = new Task();
    task1.description = 'task 1';
    task2.description = 'task 2';
    task3.description = 'task 3';
    task1.completed = false;
    task2.completed = true;
    task3.completed = true;
    addTask(task1); addTask(task2); addTask(task3);
    removeCompletedTask();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('task', [{ completed: false, description: 'task 1' }]);
  });
});

describe('DOM manipulation', () => {
  afterEach(() => {
    localStorageMock.setItem('task', []);
  });
  it('Should edit task description in a <li> element', () => {
    document.body.innerHTML = '<div>'
      + '  <ul id="list"><li id="task1">Task_1</li></ul>'
      + '</div>';
    const container = document.querySelector('#list');
    const liElt = document.getElementById('task1');
    const task1 = new Task();
    task1.description = 'Task_1';
    task1.id = 'task1';
    addTask(task1);
    updateTask('task1', { description: 'Task_1.0' }, container);
    expect(liElt.innerHTML).toContain('Task_1.0');
  });
  it('Should check and the box', () => {
    document.body.innerHTML = '<div id="list">'
      + '  <input type="checkbox" id="task14"  value="task 1">'
      + '</div>';
    const container = document.querySelector('#list');
    const chElt = document.getElementById('task14');
    const task14 = new Task();
    task14.completed = false;
    task14.id = 'task14';
    addTask(task14);
    updateTask('task14', { completed: true }, container);
    expect(chElt.checked).toBe(true);
  });
  it('Should uncheck and the box', () => {
    document.body.innerHTML = '<div id="list">'
      + '  <input type="checkbox" id="task14"  value="task 1" checked>'
      + '</div>';
    const container = document.querySelector('#list');
    const chElt = document.getElementById('task14');
    const task14 = new Task();
    task14.completed = true;
    task14.id = 'task14';
    addTask(task14);
    updateTask('task14', { completed: false }, container);
    expect(chElt.checked).toBe(false);
  });
});
