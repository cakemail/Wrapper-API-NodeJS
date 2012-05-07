# NodeJS package to consume the CakeMail API

You can find the CakeMail API documentation on the [Dev Portal](http://dev.cakemail.com).

## Build status [![Build Status](https://secure.travis-ci.org/cakemail/Wrapper-API-NodeJS.png?branch=master)](http://travis-ci.org/cakemail/Wrapper-API-NodeJS)

## Usage

Example call to [List.GetList](http://dev.cakemail.com/api/List/GetList):

```javascript
var cakemail = require("cakemail-api-wrapper");

var client = new cakemail.Client({
  apiKey: "<YOUR API KEY>"
});

client.execute("List", "GetList", {
  user_key: "<YOUR USER KEY>"
}, function(err, data) {
  console.log(err);
  console.log(data);
});
```
