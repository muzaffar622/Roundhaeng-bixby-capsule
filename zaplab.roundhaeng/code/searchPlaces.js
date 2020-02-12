var http = require("http");
var fail = require("fail");
var secret = require("secret");
var console = require("console");
var { shuffle } = require("./lib/helper.js");
var festRefact = require("./lib/typeFestRefactoring.js");
var othersRefact = require("./lib/typeOthersRefactoring.js");

module.exports.function = function searchPlaces(city, place_type, showMore) {
  if (!city && !place_type) {
    throw fail.checkedError("", "fieldsAreEmpty");
  }
  var pagenation = 1;
  var placeList = null;
  var url = secret.get("placesList");
  if (showMore == "또 보기") {
    pagenation++;
  }
  var options = {
    format: "json",
    cacheTime: 0,
    query: {
      city: city,
      type: place_type,
      page: pagenation
    },
    headers: {
      "x-api-key": secret.get("roundApiKey")
    }
  };
  try {
    var request = http.getUrl(url, options);
    if (request) {
      if (place_type == "축제" && request.item) {
        placeList = festRefact(request.item, request.info);
      } else {
        placeList = othersRefact(request);
        placeList = shuffle(placeList);
      }
    } else {
      return null;
    }
    return placeList;
  } catch (err) {
    console.log("GET RESULT PLACE ERROR" + err);
  }
  return null;
};
