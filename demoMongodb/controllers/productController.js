const express = require("express");
const app = express();

const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/sinhviens";

const svModel = require("../models/sinhVienModel");

app.get("/addScreen", (req, res) => {
  res.render("themNguoiDung");
});

app.post("/add", async (req, res) => {
  await mongoose.connect(uri);

  const ten = req.body.ten;
  const age = req.body.gia;
  const diaChi = req.body.soLuong;

  if (ten == "" || age == "" || diaChi == "") {
    res.send("Khong duoc bo trong");
  } else {
    const newSV = {
      ten: ten,
      tuoi: age,
      diachi: diaChi,
    };

    let kq = await svModel.insertMany(newSV);
    let sinhviens = await svModel.find().lean();
    res.redirect("/");
  }
});

app.get("/", async (req, res) => {
  await mongoose.connect(uri);

  let sinhviens = await svModel.find().lean();

  res.render("quanTri", { sinhviens });
});

app.get("/delete/:id", async (req, res) => {
  try {
    const user = await svModel.findByIdAndDelete(req.params.id, req.body);
    if (!user) {
      res.status(404).send("Khong co user de xoa");
    } else {
      let sinhviens = await svModel.find().lean();
      res.redirect("/");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/updateScreen/:id", async (req, res) => {
  await svModel
    .findById(req.params.id)
    .then((product) => {
      res.render("suaSanPham", {
        product: product.toJSON(),
      });
      console.log("Data: ", product);
    })
    .catch((err) => {
      console.error("err: ", err);
    });
});

app.post("/update/:id", async (req, res) => {
  const ten = req.body.ten;
  const gia = req.body.gia;
  const soLuong = req.body.soLuong;

  if (ten == "" || gia == "" || soLuong == "") {
    res.send("Khong duoc bo trong");
  } else {
    svModel
      .findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(async (updateUser) => {
        console.log("Updated user:", updateUser);
        res.redirect("/");
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  }
});

module.exports = app;
