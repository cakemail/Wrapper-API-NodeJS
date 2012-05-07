var Client = require("../lib/client");
var assert = require("assert");
var server = require("./helpers/server");
var url = require("url");
var qs = require("querystring");

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

  describe("#buildUrl", function() {
    it("should return an end-point url when passed an API class and API method", function() {
      var instance = new Client();
      assert.equal(instance.buildUrl("Client", "GetList"), "https://api.wbsrvc.com/Client/GetList");
    });

    it("should use the baseUrl when one is passed", function() {
      var instance = new Client({
        baseUrl: "http://127.0.0.1"
      });
      assert.equal(instance.buildUrl("Client", "GetList"), "http://127.0.0.1/Client/GetList");
    });
  });

  describe("#execute", function() {
    it("should accept a API class, API method, params, and a callback and execute the request", function(done) {
      var mockServer = server.request(function(req, res) {
        var data = qs.parse(req.data);
        res.end(JSON.stringify({
          status: "success",
          data: data
        }));
      });

      var instance = new Client({
        baseUrl: url.format({
          protocol: "http",
          hostname: mockServer.hostname,
          port: mockServer.port
        })
      });

      var params = {
        clientId: "1234"
      };

      instance.execute("Client", "GetList", params, function(err, data) {
        assert.equal(err, null);
        assert.equal(data.clientId, "1234");
        done();
      });
    });
  });
});
