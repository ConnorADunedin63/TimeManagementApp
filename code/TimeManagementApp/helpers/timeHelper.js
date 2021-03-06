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
    else if(hours === 12) {
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
    return 'N/A';
  }
}

/**
 * Gets the 24 hour time of the given date
 * @param date: The date we wish to get the time of
 * @return 24 hour time as a string in the format hh:mm 
 */
export function get24HourTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let time = "";

  if(hours < 10) {
    time += "0" + hours;
  }
  else {
    time += hours;
  }

  if(minutes < 10) {
    time += ":0" + minutes; 
  }
  else {
    time += ":" + minutes;
  }

  return time;
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

/**
  Returns the day of the week
  param date: The Date object that should be used
  returns String: Day of the week, for example Monday or N/A if the date object is not valid
*/
export function getDayOfWeek(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  // If the date is a valid Date object
  if(date instanceof Date) {
    return days[date.getDay()];
  }
  // If the date is not a valid Date object
  else {
    return "N/A";
  }
}

/**
  Returns the month
  param date: The Date object that should be used
  returns String: Month for example January or N/A if the date object is not valid
*/
export function getMonth(date) {
  const months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
  ];

  // If the date is a valid Date object
  if(date instanceof Date) {
    // Return the month
    return months[date.getMonth()];
  }
  // If the date is not a valid Date object
  else {
    return "N/A";
  }
}

/**
  Returns a complete date String
  params date: The Date object that should be used
  return String: The complete date String in the form mm:hh Day, dd mm yyyy or N/A if date is not a Date object
*/
export function getCompleteDate(date) {
  if(date instanceof Date) {
    return (convertTo12HourFormat(date) + " " + getDayOfWeek(date) + ", " + date.getDate() + " " + getMonth(date) + " " + date.getFullYear());
  }
  else {
    return "N/A";
  }
}


/**
  Returns only the long term goals from the original list, a long term goal is anything
  longer than three months away. Note this function does not calculate partial months.
  param: the list of goals that should be filtered
  return array: An array of JSON goal objects from the original
*/
export function getLongTermGoals(goals) {
  if(goals === null) {
    return null;
  }
  const currentDate = new Date();
  let longTermGoals = goals.filter((goal) => {
      const goalDate = goal.date;
      // Calculate the difference in months
      let diffMonths = 0;
      // Long term goals should be in the future
      if(goalDate > currentDate) {
        // If goal is in another year, it is long term
        if(goalDate.getFullYear() > currentDate.getFullYear()) {
          return goal;
        }
        // Goal is in the same year
        else {
          // Calculate the month difference
          diffMonths += (goalDate.getMonth() - currentDate.getMonth()) + 1;
          // If the goal is more than three months away, it is long term
          if(diffMonths > 3) {

            return goal;
          }
        }
      }
  });
  return longTermGoals;
}

/**
  Returns only the short term goals from the original list, a short term goal is anything
  shorter than or is three months away. Note this function does not calculate partial months.
  param: the list of goals that should be filtered
  return array: An array of JSON goal objects from the original
*/
export function getShortTermGoals(goals) {
  if(goals === null) {
    return null;
  }
  const currentDate = new Date();
  let longTermGoals = goals.filter((goal) => {
      const goalDate = goal.date;
      // Calculate the difference in months
      let diffMonths = 0;
      // Short term goals should be in the future
      if(goalDate > currentDate) {
        // If goal is in the same year, it could be short term
        if(goalDate.getFullYear() === currentDate.getFullYear()) {
          // Calculate the month difference
          diffMonths += (goalDate.getMonth() - currentDate.getMonth()) + 1;
          // If the goal is less than or three months away, it is short term
          if(diffMonths <= 3) {

            return goal;
          }
        }
      }
  });
  return longTermGoals;
}

/**
  Returns goals that do not have a set end date.
  param goals: The goals that should be filtered
  return Array: An array of JSON objects
*/
export function getOngoingGoals(goals) {
  let ongoingGoals = goals.filter((goal) => {
    if(goal.date === "N/A") {
      return goal;
    }
  });

  return ongoingGoals;
}

/**
 * Compares two time strings in 24 hour format and returns a integer value representing which time is greater
 * @param time1: The first time
 * @param time2: The second time 
 * @returns -1 if time1 is greater than time2, 0 if time1 and time2 are the same and 1 if time2 is greater than time1
 */
export function compareTimes(time1, time2) {
  let hours1 = parseInt(time1.split(":")[0]);
  let hours2 = parseInt(time2.split(":")[0]);
  
  if(hours1 < hours2) {
    return 1;
  }
  else if(hours1 > hours2) {
    return -1;
  }
  else {
    let minutes1 = parseInt(time1.split(":")[1]);
    let minutes2 = parseInt(time2.split(":")[1]);

    if(minutes1 < minutes2) {
      return 1;
    }
    else if(minutes1 > minutes2) {
      return -1;
    }
    else {
      return 0;
    }
  }

}
