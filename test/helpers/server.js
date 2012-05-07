var http = require("http");
var port = 9090;
var hostname = "127.0.0.1";

module.exports.request = function(cb) {
  var server = new http.Server();
  port = port + 1;

  server.listen(port, hostname);
  server.on("request", function(req, res) {
    var data = "";

    req.on("data", function(chunk) {
      data = data + chunk;
    });

    req.on("end", function() {
      req.data = data;
      cb(req, res);
    });
  });

  return {
    hostname: hostname,
    port: port
  };
};
