
var caculator = require('./caculator')
var express = require('express');
const bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
  var a = req.body.a;
  var b = req.body.b;
  var op = req.body.op;

  var ketQua = 0;

  if(op == "+"){
    ketQua = caculator.add(parseInt(a), parseInt(b));
  } else if(op == "-"){
    ketQua = caculator.subtract(parseInt(a), parseInt(b));
  } else if(op == "*"){
    ketQua = caculator.multiply(parseInt(a), parseInt(b));
  } else if(op == "/"){
    ketQua = caculator.division(parseInt(a), parseInt(b));
  }

  res.send(a + " " + op + " " + b + " = " + ketQua);
});

app.listen(PORT, () => console.log("Server dang chay cong : " + PORT));