/**
  Checks a given checklist for a task.
  param checklist: The checklist that should be checked
  param task: The name of the task to look for
  return boolean: true if the task is not present in the checklist, false if it is
*/
export function taskNotPresent(checklist, task) {
  checklist.forEach(item => {
    // Task is present, return false
    if(item.name === task) {
      return false;
    }
  });
  return true;
}

/**
  Deletes a task from the given checklist
  param checklist: The checklist containing the task
  param task: The name of the task to delete
  return array: The updated array of JSON objects
*/
export function deleteTask(checklist, task) {
  let modifiedChecklist = copyChecklist(checklist);
  let taskIndex = -1;
  for(let i = 0; i < modifiedChecklist.length; i ++) {
    if(modifiedChecklist[i].name === task) {
      taskIndex = i;
      break;
    }
  }
  // Remove the task if it was found
  if(taskIndex !== -1) {
    modifiedChecklist.splice(taskIndex, 1);
  }
  return modifiedChecklist;
}


/**
  Returns a deep copy of the original checklist
  param checklist: The checklist to be copied
  return array: The deep copy of the checklist
*/
function copyChecklist(checklist) {
  let newChecklist = [];
  for(let i = 0; i < checklist.length; i ++) {
    newChecklist.push(checklist[i]);
  }
  return newChecklist;
}
