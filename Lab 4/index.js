var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

//cau hinh handlebars
var expressHBS = require('express-handlebars');

app.engine('.hbs', expressHBS.engine({ extname: "hbs", defaultLayout: 'index', layoutsDir: "Views/" }));

app.engine('.hbs', expressHBS.engine({ extname: "hbs", defaultLayout: 'BaiTho', layoutsDir: "Views/" }));

app.set('view engine', '.hbs');
app.set('Views', 'Views');

app.get('/', function(req, res) {
  res.send("Hello World");
});

// dua layout vao day
app.get('/handlebars', function(req, res) {
  res.render('index');
  console.log("1");
});
app.get('/baitho', function(req, res) {
  res.render('BaiTho');
  console.log("2");
});
app.listen(port, () => {
  console.log("Server dang chay cong: " + port);
});