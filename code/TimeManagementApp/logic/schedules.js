import AsyncStorage from "@react-native-community/async-storage";

/**
 * Returns all schedules stored in async storage
 * @returns: An array of JSON objects, where each object is a separate schedule
 */
export async function getSchedules() {
    try {
        const data = await AsyncStorage.getItem("@schedules");
        if(data !== null) {
            let jsonData = JSON.parse(data);
            let data = jsonData.map((record) => {
                let transformedSchedule = {
                    name: record.name,
                    description: record.description,
                    tasks: record.tasks,
                    key: record.key
                };
                return transformedSchedule
            });

            return data;
        }
        // No schedules set, return an empty array
        else {
            return [];
        }
    }
    catch(e) {
        console.log("The following error has occured while retrieving schedules: " + e);
    }
}

/**
 * Adds a new schedule to the list of currently stored schedules
 * @param name: The name of the schedule 
 * @param description: The description of the schedule 
 * @param tasks: A json list of tasks, each task should have a name, description, start time and end time 
 */
export async function setSchedules(name, description, tasks) {
    let currentSchedules = getSchedules();
    // The schedule name should be unique
    for(let i = 0; i < currentSchedules.length; i ++) {
        if(currentSchedules[i].name.localCompare(name) === 0) {
            return false;
        }
    }

    let newSchedule = {
        name: name,
        description: description,
        tasks: tasks
    };

    currentSchedules.push(newSchedule);

    try {
        await AsyncStorage.setItem("@schedules", currentSchedules);
    }
    catch(e) {
        console.log("The following error has occured while saving schedule: " + e);
    }
}