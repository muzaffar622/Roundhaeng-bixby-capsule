var dates = require("dates");
var console = require("console");
const daysOfWeek = ["rmZero", "월", "화", "수", "목", "금", "토", "일"];

function findDayOff(days) {
  var daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
  if (days != "매일") {
    var dayOffs = daysOfWeek.filter(obj => days.indexOf(obj) == -1);
    return dayOffs;
  } else {
    return days;
  }
}

function getTodayOfWeek() {
  var currentDay = dates.ZonedDateTime.now().getDayOfWeek();
  return [daysOfWeek[currentDay]];
}

function checkStatusOfPlaceTime(hours, days) {
  var currentTime =
    dates.ZonedDateTime.now().getDateTime().time.hour +
    "." +
    dates.ZonedDateTime.now().getDateTime().time.minute;

  if (hours) {
    var dayOff = findDayOff(days);
    var today = getTodayOfWeek();
    var isItDayOff = dayOff.filter(e => today.indexOf(e) !== -1);

    if (isItDayOff[0] != null) {
      return "close";
    } else {
      if (hours.round == true) {
        return "open";
      } else if (hours.open && hours.close) {
        if (currentTime > hours.open && currentTime < hours.close)
          return "open";
        else return "close";
      }
    }
  } else return null;
}

module.exports = checkStatusOfPlaceTime;
