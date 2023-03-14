var http = require('http')
var uc = require('upper-case')
var utils = require('../lab1/uitils')
var url = require('url')

const date2 = function() {
    return Date().toUpperCase();
}


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  res.write(uc.upperCase("Thoi gian hien tai la: " + utils.myDateTime() + "\n"))

  res.write(uc.upperCase("\n" + "Thoi gian hien tai la: " + date2()))

  var q =url.parse(req.url, true)
  var txt = q.year + " " + q.momth

  res.write(txt)

  res.end();
}).listen(8080);