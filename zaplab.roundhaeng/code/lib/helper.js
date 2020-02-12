var console = require("console");

// 창소 타입을 구분해 줌
function findType(place_type) {
  var type = null;
  if (place_type != undefined) {
    switch (String(place_type)) {
      case "공원":
        type = "park";
        break;
      case "놀거리":
        type = "놀거리";
        break;
      case "바다":
        type = "바다";
        break;
      case "엑티비티":
        type = "엑티비티";
        break;
      case "등산":
        type = "등산";
        break;
      case "쇼핑":
        type = "쇼핑";
        break;
      case "먹거리":
        type = "먹거리";
        break;
      case "문화":
        type = "문화";
        break;
      case "축제":
        type = "축제";
        break;
      default:
        type = null;
        break;
    }
  }
  return type;
}

// return array list randomly
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function makeMapUrl(address, title) {
  try {
    if (title && address && address.point.latitude && address.point.longitude) {
      var url =
        "https://map.kakao.com/link/map/" +
        title +
        "," +
        +address.point.latitude +
        "," +
        address.point.longitude;
      return url;
    } else return null;
  } catch (err) {
    console.log("ERROR makeMapUrl: ", err);
    return null;
  }
}

module.exports = {
  findType: findType,
  shuffle: shuffle,
  makeMapUrl: makeMapUrl
};
