const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes');
const app = express();
const port = 3000;

          app.use(        express.static(path.join(__dirname, 'public')));

// xử lý dữ liệu được gửi từ form
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// xử lý duữ liệu gửi từ javaScripts
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Tempate engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources/views'));

// Action ---> Dispatcher ---> Function handler

// routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
