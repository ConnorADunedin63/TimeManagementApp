import { taskNotPresent, deleteTask } from '../../logic/tasks.js';

describe("taskNotPresent function", () => {
  it("should return false if a duplicate task is trying to be added.", () => {
    let tasks = [
      {name: 'Test task 1', complete: false},
      {name: 'Test task 2', complete: false}
    ];
    expect(taskNotPresent(tasks, "Test task 1")).toBe(false);
  });

  it("should return true if the task is not a duplicate.", () => {
    let tasks = [
      {name: 'Test task 1', complete: false},
      {name: 'Test task 2', complete: false}
    ];
    expect(taskNotPresent(tasks, "Test task 3")).toBe(true);
  })
});


describe("deleteTask function", () => {
  it("should return a duplicate array when the task cannot be found.", () => {
    let tasks = [
      {name: 'Test task 1', complete: false},
      {name: 'Test task 2', complete: false}
    ];
    let duplicateArray = deleteTask(tasks, "Test task 3")
    expect(duplicateArray.length).toBe(tasks.length);

    for(let i = 0; i < duplicateArray.length; i ++) {
      expect(duplicateArray[i].name).toBe(tasks[i].name);
      expect(duplicateArray[i].complete).toBe(tasks[i].complete);
    }
  });

  it("should return an array with the task removed.", () => {
    let tasks = [
      {name: 'Test task 1', complete: false},
      {name: 'Test task 2', complete: false}
    ];
    let duplicateArray = deleteTask(tasks, "Test task 1")
    expect(duplicateArray.length).toBe(tasks.length - 1);

    for(let i = 0; i < duplicateArray.length; i ++) {
      expect(duplicateArray[i].name).toBe(tasks[i + 1].name);
      expect(duplicateArray[i].complete).toBe(tasks[i + 1].complete);
    }
  });
});
