var Request = require("../lib/request");
var post = require("request").post;
var assert = require("assert");
var server = require("./helpers/server");
var url = require("url");

describe("Request", function() {

  describe("#constructor", function() {
    it("should accept an api key in configs hash", function() {
      var instance = new Request({
        apiKey: "1234"
      });

      assert.equal(instance.apiKey, "1234");
    });

    it("should accept a url end-point in configs hash", function() {
      var instance = new Request({
        url: "http://127.0.0.1/Client/GetList"
      });

      assert.equal(instance.url, "http://127.0.0.1/Client/GetList");
    });
  });

  describe("#respond", function() {
    it("should take an api response and trigger a callback error on error", function(done) {
      var instance = new Request();
      instance.respond({
        status: 'failed',
        data: 'Error message'
      }, function(err, response) {
        assert.equal(err, 'Error message');
        done();
      });
    });

    it("should take an api response and pass data to callback on success", function(done) {
      var instance = new Request();
      instance.respond({
        status: 'success',
        data: 'data'
      }, function(err, response) {
        assert.equal(err, null);
        assert.equal(response, 'data');
        done();
      });
    });
  });

  describe("#execute", function() {
    it("should perform an http request with the provided arguments and trigger the callback", function(done) {
      var apiKey = "1234";
      var params = {
        userKey: "1234",
        clientId: "4567"
      };

      var mockServer = server.request(function(req, res) {
        assert.equal(req.headers.apikey, apiKey, "API key should be passed in request headers.");

        var data = JSON.parse(req.data);
        res.end(JSON.stringify({
          status: "success",
          data: data
        }));
      });

      var instance = new Request({
        apiKey: apiKey,
        url: url.format({
          protocol: "http",
          hostname: mockServer.hostname,
          port: mockServer.port,
          pathname: "/Client/GetList"
        })
      });

      instance.execute(params, function(err, response) {
        assert.equal(response.userKey, "1234");
        assert.equal(response.clientId, "4567");
        done();
      });
    });
  });

});
