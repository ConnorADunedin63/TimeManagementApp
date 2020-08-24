/**
 * Returns a new JSON object with the name, description, startTime and endTime
 * @param name: The name of the task 
 * @param description: An optional description 
 * @param startTime: The start time 
 * @param endTime: The end time 
 * @param currentTasks: An array containing the current tasks
 * @returns Array of JSON objects, that is the current tasks with the new task inserted in the correct position
 */
function updateScheduleTasks(name, description, startTime, endTime, currentTasks) {
    const newTask = {
        key: name + startTime,
        name: name,
        description: description,
        startTime: startTime,
        endTime: endTime
    };

    // Go through all the current tasks and make sure the new task is not present
    for(let i = 0; i < currentTasks.length; i ++) {
        if(currentTasks[i].key === newTask.key) {
            // Inform the user that the task is already present
            alert("Task with the same name and start time already exists!");
            return currentTasks;
        }
    }

    // Add the task to the array of current tasks in the correct place
    let taskIndex = -1;
    for(let i = 0; i < currentTasks.length; i ++) {
        let taskDate = new Date(currentTasks[i].startTime);
        let newTaskDate = new Date(newTask.startTime);

        // New task is before the current task, record index and break
        if(newTaskDate < taskDate) {
            taskIndex = i;
            break;
        }
    }

    // Insert the new task at the given index
    currentTasks.splice(taskIndex, 0, newTask);

    return currentTasks;
}