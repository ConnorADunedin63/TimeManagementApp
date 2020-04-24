/**
  A series of functions that format dates and time in certain ways
*/

/**
  Converts the time of a Date to 12 hours and returns it as a String.
  param datetime: The Date object that should be used
  return String: The time of the Date in 12 hour format
*/
export function convertTo12HourFormat(date) {
  if(date instanceof Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
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

/**
  Formats the date in the form dd/mm/yyyy
  params date: the Date object that should be used
  return String: a String in the form dd/mm/yyyy
*/
export function formatDate(date) {
  // If the date is an instanceof Date
  if(date instanceof Date) {
    // Gets the day of the month
    // Month start at 0 so we need to add 1 to get the correct date
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(day < 10) {
      day = "0" + day;
    }
    if(month < 10) {
      month = "0" + month;
    }

    return day + "/" + month + "/" + year;
  }
  // If date is not a valid Date object
  else {
    return "N/A";
  }
}
