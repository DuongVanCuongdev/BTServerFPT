const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/sinhviens";

const svModel = require("./sinhVienModel");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const expressHbs = require("express-handlebars");

app.engine(
  ".hbs",
  expressHbs.engine({
    extname: "hbs",
    defaultLayout: "index",
    layoutsDir: "views/layouts/",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("themNguoiDung");
});

app.post("/themNguoiDung", async (req, res) => {
  await mongoose.connect(uri);

  const ten = req.body.ten;
  const age = req.body.tuoi;
  const diaChi = req.body.diaChi;
  arrNewSv = [];

  arrNewSv.push({
    ten: ten,
    tuoi: age,
    diachi: diaChi,
  });

  let kq = await svModel.insertMany(arrNewSv);

  let sinhviens = await svModel.find().lean();
  res.render("quanTri", { sinhviens });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
