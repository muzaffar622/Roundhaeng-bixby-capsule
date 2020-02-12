var console = require('console');
var http = require('http');

module.exports.function = function eventAmericano (number, $vivContext) {
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
        'phoneNumber': number,
        'userId': $vivContext.bixbyUserId
      };
    var url = secret.get('event');
    var request = http.postUrl(url, body, options);
  }catch(err){
    console.log("ERROR: recommendPlace" + err);
  }
  request = JSON.parse(request);
  return {
    status: request.status
  }
}
