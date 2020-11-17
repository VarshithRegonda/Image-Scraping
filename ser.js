var async = require("async");
var request = require("request");

// create request objects
var requests = [{
  url: 'https://api.com/categories',
  headers: {
    'Bearer': 'sampleapitoken'
  }
}, {
  url: 'https://api.com/staff',
  headers: {
    'Bearer': 'sampleapitoken'
  }
}];

async.map(requests, function(obj, callback) {
  // iterator function
  request(obj, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // transform data here or pass it on
      var body = JSON.parse(body);
      console.log(body)
      callback(null, body);
    } else {
      callback(error || response.statusCode);
    }
  });
}, function(err, results) {
  // all requests have been made
  if (err) {
    // handle your error
  } else {
    console.log(results);
    for (var i = 0; i < results.length; i++) {
        console.log(results[i])
    }
  }
})