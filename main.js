var http = require("http");
var fs = require("fs");

// "url" 이라는 node 는 url 이라는 변수를 통해 사용할 것
var url = require("url");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  console.log(_url);
  var queryData = url.parse(_url, true).query;
  console.log(queryData.id);
  if (_url == "/") {
    _url = "/index.html";
  }
  if (_url == "/favicon.ico") {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200);
  // console.log(__dirname + _url);
  // response.end(fs.readFileSync(__dirname + _url));

  response.end(queryData.id);
});
app.listen(3000);
