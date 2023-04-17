const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const expressHbs = require('express-handlebars')
const bodyParser = require('body-parser')
const SanPhamRouter = require('./router/SanPhamRouter')
const SanPhamRouterMB = require('./router/SanPhamRouterMobile')


const dbConnect = require('./connect')
dbConnect.connect();

app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: "main", helpers: { sum: (a, b) => a + b }}))
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.use('/sanpham', SanPhamRouter)
app.use('/api', SanPhamRouterMB)

app.get('/', function (req, res) {
  res.render('DanhSachSanPham')
})



app.listen(port, () => {
  console.log(`Localhost đang lắng nghe cổng http://localhost:${port}`);
  
})