/**
 * Assumes that the array has a length of 7 and only contains boolean values.
 * Checks whether only Monday to Friday is selected.
 * @param days: The array that should be checked 
 * @returns true if only all weekdays are selected and nothing else
 */
export function isWeekdays(days) {
    // Weekends cannot be true
    if(days[0] === true || days[6] == true) {
        return false;
    } 
    // Saturday and Sunday are not being checked
    for(var i = 1; i < days.length - 1; i ++) {
        // If one of the weekdays is false, return false
        if(days[i] === false) {
            return false;
        }
    }
    return true;
}

/**
 * Assumes that the array has a length of 7 and only contains boolean values.
 * Checks whether only Saturday and Sunday are selected.
 * @param days: The array that should be checked 
 * @returns true if only the weekend is selected
 */
export function isWeekends(days) {
    // Both weekend values must be true
    if(days[0] === false || days[6] === false) {
        return false;
    }

    // No weekday should be true
    for(var i = 1; i < days.length - 1; i ++) {
        if(days[i] === true) {
            return false;
        }
    }

    return true;
}

/**
 * Assumes that the array has a length of 7 and only contains boolean values.
 * Checks whether every day of the week is selected.
 * @param days: The array that should be checked
 */
export function isEveryday(days) {
    for(var i = 0; i < days.length; i ++) {
        if(days[i] === false) {
            return false;
        }
    }
    return true;
}