var Client = require("../lib/client");
var assert = require("assert");

describe("Client", function() {
  describe("#constructor", function() {
    it("should accept api key in configs hash", function() {
      var instance = new Client({
        apiKey: "1234"
      });

      assert.equal(instance.apiKey, "1234");
    });

    it("should accept a base url in configs hash", function() {
      var instance = new Client({
        baseUrl: "http://127.0.0.1"
      });

      assert.equal(instance.baseUrl, "http://127.0.0.1");
    });

    it("should default the base url when not specified", function() {
      var instance = new Client();
      assert.ok(instance.baseUrl);
    });
  });
});
