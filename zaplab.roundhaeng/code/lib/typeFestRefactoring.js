var console = require("console");
var dates = require("dates");
var { makeMapUrl } = require("./helper.js");

function isExpired(eventenddate) {
  var currentDate =
    dates.ZonedDateTime.now().getYear() +
    "" +
    dates.ZonedDateTime.now().getMonth() +
    "" +
    dates.ZonedDateTime.now().getDay();
  if (eventenddate > currentDate || eventenddate == currentDate) {
    return "open";
  } else return "close";
}

function reDate(start, end) {
  start = JSON.stringify(start);
  end = JSON.stringify(end);
  var period = (newStart = newEnd = null);
  newStart =
    start.slice(0, 4) + "." + start.slice(4, 6) + "." + start.slice(6, 8);
  newEnd = end.slice(0, 4) + "." + end.slice(4, 6) + "." + end.slice(6, 8);
  period = newStart + " ~ " + newEnd;
  return period;
}

function showMore_helper(info) {
  let isLimit;
  isLimit = info.numOfRows * info.pageNo;
  if (isLimit < info.totalCount) {
    if (isLimit + 10 > info.totalCount) {
      return false;
    }
    return true;
  } else return false;
}

function makeObj(obj, info) {
  obj.status = isExpired(obj.eventenddate);
  obj.days = reDate(obj.eventstartdate, obj.eventenddate);
  obj.event = true;
  obj.limit = showMore_helper(info);
  if (obj.festDetailIntro) {
    let intro = obj.festDetailIntro;
    if (intro.price) obj.price = intro.price;
    if (intro.subevent) obj.about = intro.subevent;
    if (intro.place_type) obj.place_type = intro.place_type;
    if (intro.playtime) obj.playtime = intro.playtime;
    if (intro.web_url) obj.web_url = intro.web_url;
    delete obj.festDetailIntro;
  }
  obj.url = makeMapUrl(obj.address_map, obj.place_name);
  if (obj.firstimage) delete obj.firstimage;
  if (obj.readcount) delete obj.readcount;
  delete obj.eventstartdate;
  delete obj.eventenddate;

  return obj;
}

function handler(array, info) {
  let objs = [];
  if (array && !array.length) {
    objs.push(makeObj(array, info));
  } else if (array && array.length) {
    for (let i = 0; i < array.length; i++) {
      objs.push(makeObj(array[i], info));
    }
  }
  return objs;
}

module.exports = handler;
