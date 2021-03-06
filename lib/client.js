var Request = require("./request");
var DEFAULT_BASE_URL = "https://api.wbsrvc.com";

module.exports = (function() {
  function Client(configs) {
    configs = configs || {};

    this.apiKey = configs.apiKey || "";
    this.baseUrl = configs.baseUrl || DEFAULT_BASE_URL;
  }

  Client.prototype.buildUrl = function(apiClass, apiMethod) {
    return [
      this.baseUrl,
      apiClass,
      apiMethod
    ].join("/")
  };

  Client.prototype.execute = function(apiClass, apiMethod, params, cb) {
    var request = new Request({
      apiKey: this.apiKey,
      url: this.buildUrl(apiClass, apiMethod)
    });
    return request.execute(params, cb);
  };

  return Client;
})();
