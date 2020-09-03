import AsyncStorage from "@react-native-community/async-storage";

/**
 * Returns all schedules stored in async storage
 * @returns: An array of JSON objects, where each object is a separate schedule
 */
export async function getSchedules() {
    try {
        let data = await AsyncStorage.getItem("@schedules");
        if(data !== null) {
            let jsonData = JSON.parse(data);
            data = jsonData.map((record) => {
                let transformedSchedule = {
                    name: record.name,
                    description: record.description,
                    days: record.days,
                    tasks: record.tasks
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
 * @param days: The days a schedule is active on
 * @param tasks: A json list of tasks, each task should have a name, description, start time and end time 
 */
export async function setSchedules(name, description, days, tasks) {
    let currentSchedules = await getSchedules();
    // The schedule name should be unique
    for(let i = 0; i < currentSchedules.length; i ++) {
        if(currentSchedules[i].name.localeCompare(name) === 0) {
            return false;
        }
    }

    let newSchedule = {
        name: name,
        description: description,
        days: days,
        tasks: tasks
    };

    currentSchedules.push(newSchedule);

    try {
        await AsyncStorage.setItem("@schedules", JSON.stringify(currentSchedules));
    }
    catch(e) {
        console.log("The following error has occured while saving schedule: " + e);
    }

    return currentSchedules;
}

/**
 * Removes the schedule with the given key if present.
 * @param key: The key of the schedule that should be removed
 * @returns The schedules with the schedule with the given key removed, schedules shouldn't change if key can't be found 
 */
export async function deleteSchedule(key) {
    let currentSchedules = await getSchedules();
    let scheduleIndex = -1;

    for(let i = 0; i < currentSchedules.length; i ++) {
        if(currentSchedules[i].name.localeCompare(key) === 0) {
            scheduleIndex = i;
            break;
        }
    }

    if(scheduleIndex !== -1) {
        currentSchedules.splice(scheduleIndex, 1);
        try {
            await AsyncStorage.setItem("@schedules", JSON.stringify(currentSchedules));
        }
        catch(e) {
            console.log("The following error has occured while removing schedule: " + e);
        }
    }
}