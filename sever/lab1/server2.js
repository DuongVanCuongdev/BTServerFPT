var http = require("http");
var fs = require("fs");

http
  .createServer(function (req, res) {

    fs.readFile("data.json", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write(data);
    });
  })
  .listen(8000);
