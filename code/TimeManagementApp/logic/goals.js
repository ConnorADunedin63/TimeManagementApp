import AsyncStorage from '@react-native-community/async-storage';

/**
  Gets the current list of goals from asynchronous storage
*/
export async function getGoals() {
  try {
    const data = await AsyncStorage.getItem('@goals');
    if(data !== null) {
      let jsonData = JSON.parse(data);
      jsonData = jsonData.map((record) => {
        let newRecord = {
          name: record.name,
          description: record.description,
          date: new Date(record.date),
          key: record.key
        };
        return newRecord;
      });

      if(jsonData !== null) {
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
    key: currentGoals.length
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
