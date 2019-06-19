// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes, seconds) {
  minutes += seconds / 60;
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds, milliseconds) {
  seconds += milliseconds / 1000;
  return (360 / 60) * seconds;
}

export {
  hoursToAngle,
  minutesToAngle,
  secondsToAngle
}