/**
  A series of functions that format dates and time in certain ways
*/

/**
  Converts the time of a Date to 12 hours and returns it as a String.
  param datetime: The Date object that should be used
  return String: The time of the Date in 12 hour format
*/
export function convertTo12HourFormat(datetime) {
  if(datetime instanceof Date) {
    let hours = datetime.getHours();
    let minutes = datetime.getMinutes();
    let pm = false

    // Convert hours to 12 hour format
    if(hours > 12) {
      hours = hours - 12;
      pm = true;
    }

    // Should translate 0 to 12
    if(hours == 0) {
      hours = "12";
    }
    // Add a 0 for hours 1-9
    else if(hours < 10) {
        hours = "0" + hours;
    }

    // Minutes should have a 0 in front if it is less than 10
    if (minutes < 10) {
      minutes = "0" + minutes
    }

    let format = ""
    if(pm) {
      format += hours + ":" + minutes + "PM";
    }
    else {
      format += hours + ":" + minutes + "AM"
    }
    return format;
  }
  else {
    console.log("datetime is not a Date object");
    return 'N/A';
  }
}
