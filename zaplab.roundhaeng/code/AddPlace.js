var console = require('console');
var http = require('http')

module.exports.function = function addPlace (recommendData, city,$vivContext) {
  try{
    var options = {
      passAsJson: true, 
      cacheTime: 0,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": secret.get('roundApiKey')
      }
    };
      var body = {
        'city': city,
        'place_name': recommendData,
        'userId': $vivContext.bixbyUserId
      };
    var url = secret.get('recommendPlace');
    var request = http.postUrl(url, body, options);
  }catch(err){
    console.log("ERROR: recommendPlace" + err);
  }
  request = JSON.parse(request);
  return {
    status: request.status,
    event: request.event
  }
}
