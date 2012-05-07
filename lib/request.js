var post = require("request").post;
var qs = require("querystring");

module.exports = (function() {
  function Request(configs) {
    configs = configs || {};

    this.apiKey = configs.apiKey || "";
    this.url = configs.url || "";
  }

  Request.prototype.respond = function(responseData, cb) {
    if (responseData.status != "success") {
      return cb(responseData.data);
    }

    return cb(null, responseData.data);
  };

  Request.prototype.execute = function(params, cb) {
    var body = qs.stringify(params);
    var self = this;

    post({
      url: this.url,
      body: body,
      headers: {
        APIKEY: this.apiKey
      }
    }, function apiResponse(err, res) {
      if (err) {
        return cb(err);
      }

      self.respond(JSON.parse(res.body), cb);
    });
  };

  return Request;
})();
