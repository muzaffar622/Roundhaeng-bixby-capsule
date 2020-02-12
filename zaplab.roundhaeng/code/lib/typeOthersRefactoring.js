var console = require("console");
var checkStatusOfPlaceTime = require("./findDayOff.js");
var { makeMapUrl } = require("./helper.js");

// 창소가 영업 주 일을 Array -> object로 바꿔 줌
function calculateDays(days) {
  if (days) {
    days = days.join(", ");
    return days;
  }
}

// 영업 시간이 24 시간이면 open~close 시간을 newHour 24 시간으로 바꿔줌
function calculateHours(hours) {
  var newHour = hours;
  if (!hours.round || hours.round == false) {
    newHour = newHour.open + " ~ " + newHour.close;
  } else newHour = "24 시간";
  return newHour;
}

// 팔드들을 관리 해 줌 (주의!)
function handler(array) {
  try {
    let newArray = array;
    if (newArray && newArray.length) {
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].createdAt) delete newArray[i].createdAt;
        if (newArray[i].updatedAt) delete newArray[i].updatedAt;
        if (newArray[i].about == "없음") delete newArray[i].about;
        if (newArray[i].about == "null") delete newArray[i].about;
        newArray[i].event = false;
        delete newArray[i].place_id;
        if (newArray[i].tel_number == "null") delete newArray[i].tel_number;
        if (newArray[i].web_url == "null") delete newArray[i].web_url;
        if (newArray[i].price && newArray[i].price == "null")
          delete newArray[i].price;
        newArray[i].status = checkStatusOfPlaceTime(
          newArray[i].hours,
          newArray[i].days
        );
        newArray[i].hours = calculateHours(newArray[i].hours);
        newArray[i].days = calculateDays(newArray[i].days);
        newArray[i].url = makeMapUrl(
          newArray[i].address_map,
          newArray[i].place_name
        );
      }
    }
    return newArray;
  } catch (err) {
    console.log("ERROR remakeArray: ", err);
    return null;
  }
}

module.exports = handler;
