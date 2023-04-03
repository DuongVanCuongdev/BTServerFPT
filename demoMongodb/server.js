const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

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

const productController = require("./controllers/productController");

app.use(productController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
