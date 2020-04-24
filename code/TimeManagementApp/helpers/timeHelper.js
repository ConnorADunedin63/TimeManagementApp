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
  Returns only the long term goals from the original list, a long term goal is anything
  longer than three months away. Note this function does not calculate partial months.
  param: the list of goals that should be filtered
  return array: An array of JSON goal objects from the original
*/
export function longTermGoals(goals) {
  const currentDate = new Date();

  let longTermGoals = goals.map((goal) => {
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
