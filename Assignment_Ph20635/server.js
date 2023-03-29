const express = require('express');
const logger = require('morgan')
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('css'))
app.use(express.static('images'))

const expressHbs = require('express-handlebars')
app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: 'index', layoutsDir: "views/layouts/" }));
app.set('view engine', '.hbs');
app.set('views', './views');



var appRouter = require('./router/appRouter');

app.use(appRouter)





app.listen(port, () => {
  console.log(`Localhost dang chay cong: ${port}`)
});

module.exports = app;

