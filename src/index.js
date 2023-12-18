const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes');
require('dotenv').config();
const connectDB = require('./app/config/connectDB');
const session = require("express-session");
const cors = require('cors');

const app = express();
app.use(cors());

// session
app.use(session({
  secret: 'thuan2002',
  resave: false,
  saveUninitialized: true,
}));


// Port === undefined => port = 3000
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// xử lý dữ liệu được gửi từ form
app.use(express.urlencoded({
  extended: true
}));

// xử lý dữ liệu gửi từ javaScripts
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));


// connect database
connectDB();

// Tempate engine
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


// Action ---> Dispatcher ---> Function handler

// routes init
route(app);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})