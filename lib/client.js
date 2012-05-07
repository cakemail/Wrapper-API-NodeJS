var DEFAULT_BASE_URL = "https://api.wbsrvc.com";

module.exports = (function() {
  function Client(configs) {
    configs = configs || {};

    this.apiKey = configs.apiKey || "";
    this.baseUrl = configs.baseUrl || DEFAULT_BASE_URL;
  }

  return Client;
})();
