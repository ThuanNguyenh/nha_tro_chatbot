
// import routes/news.js
const newRouter = require('./news');
const siteRouter = require('./site');


// app = express
function route(app) {
  
  // news
    app.use('/news', newRouter);

    // home
    app.use('/', siteRouter);

}

module.exports = route;
