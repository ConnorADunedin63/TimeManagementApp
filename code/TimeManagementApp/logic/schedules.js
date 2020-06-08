import AsyncStorage from "@react-native-community/async-storage";

/**
 * Returns all schedules stored in async storage
 * @returns: An array of JSON objects, where each object is a separate schedule
 */
export function getSchedules() {
    try {
        const data = await AsyncStorage.getItem("@schedules");
        if(data !== null) {
            
        }
    }
    catch(e) {
        console.log("The following error has occured: " + e);
    }
}