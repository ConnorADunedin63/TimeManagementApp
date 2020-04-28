import AsyncStorage from '@react-native-community/async-storage';
import { getLongTermGoals, getShortTermGoals, getOngoingGoals } from '../helpers/timeHelper.js';

/**
  Gets the current list of goals from asynchronous storage
*/
export async function getGoals(filter) {
  try {
    const data = await AsyncStorage.getItem('@goals');
    if(data !== null) {
      let jsonData = JSON.parse(data);
      jsonData = jsonData.map((record) => {
        let date = record.date;
        // If the goal does have an end date
        if(date !== "N/A") {
          date = new Date(date);
        }
        let newRecord = {
          name: record.name,
          description: record.description,
          date: date,
          key: record.key
        };
        return newRecord;
      });

      if(jsonData !== null) {
        if(filter === "Long Term") {
          jsonData = getLongTermGoals(jsonData);
        }
        else if(filter === "Short Term") {
          jsonData = getShortTermGoals(jsonData);
        }
        else if(filter === "Ongoing") {
          jsonData = getOngoingGoals(jsonData);
        }
        return jsonData;
      }
      else {
        return [];
      }
    }
    else {
      return [];
    }
  } catch(e) {
    console.log("The following error occured while retrieving goals...");
    console.log(e);
  }
}

/**
  Adds a goals with the given name, description and date to the list of goals
*/
export async function setGoals(name, description, date) {
  // Gets the current goals =
  var currentGoals = await getGoals();

  // key is required for the home screen as each list item should have a unique key
  const newGoal = {
    name: name,
    description: description,
    date: date,
    key: name + date
  };

  // Push the new goal to the array
  currentGoals.push(newGoal);

  try {
    await AsyncStorage.setItem('@goals', JSON.stringify(currentGoals));
  }
  catch(e) {
    console.log("The following error occured while setting goals...");
    console.log(e);
  }
}

/**
  Clears all goals and replaces the value with an empty array
*/
export async function clearGoals() {
    try {
      await AsyncStorage.setItem('@goals', JSON.stringify([]))
    }
    catch(e) {
      console.log("The following error occured while clearing goals...");
      console.log(e);
    }
}


/**
  Edits an existing goal using the name, description and date from the edit page.
  The unique key is used to find the goal that should be updated
  param name: The name of the goal
  param description: The description of the goal
  param date: The date of the goal
  param key: The unique key for the goal that should be updated
  return none: Function returns nothing, updated goals are sent to asynchronous storage
*/
export async function updateGoal(name, description, date, key) {
  // Gets the current goals
  var currentGoals = await getGoals();

  for(let i = 0; i < currentGoals.length; i ++) {
    // If the keys match
    if(currentGoals[i].key === key) {
      // Update the details and break
      currentGoals[i].name = name;
      currentGoals[i].description = description;
      currentGoals[i].date = date;
      break;
    }
  }

  try {
    // Send the modified goals to asynchronous storage
    await AsyncStorage.setItem('@goals', JSON.stringify(currentGoals));
  }
  catch(e) {
    console.log("The following error occured while updating goal...");
    console.log(e);
  }
}

/**
  Deletes a goal with the given key
  param key: The key of the goal that should be removed
  return none: List of goals is updated to AsyncStorage
*/
export async function deleteGoal(key) {
  var currentGoals = await getGoals();
  var index = -1;
  for(var i = 0; i < currentGoals.length; i ++) {
    // If the goal is found
    if(currentGoals[i].key === key) {
      // Save the index and break
      index = i;
      break;
    }
  }

  // Remove the goal at index
  if(index !== -1) {
    currentGoals.splice(index, 1);
    try {
      await AsyncStorage.setItem('@goals', JSON.stringify(currentGoals));
    }
    catch(e) {
      console.log("The following error occured while deleting goal");
      console.log(e);
    }
  }
}

/**
  Copies the original array and updates the JSON
  param checklist: The original checklist
  param index: The index of the task that should be toggled
  return Array: The new checklist with the task at index being toggled
*/
export function updateTask(checklist, index) {
  let updatedChecklist = [];
  // Copy the JSON to the new array
  for(let i = 0; i < checklist.length; i ++) {
    updatedChecklist.push(checklist[i]);
  }
  // Toggle the task at index
  updatedChecklist[index].complete = !updatedChecklist[index].complete;

  return updatedChecklist;
}
