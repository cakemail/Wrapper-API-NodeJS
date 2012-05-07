var index = require("../");
var assert = require("assert");

describe("Index", function() {

  it("should expose Client", function() {
    assert.ok(index.Client);
  });

  it("should expose Request", function() {
    assert.ok(index.Request);
  });

});
