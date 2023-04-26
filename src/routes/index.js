

const express = require('express');
const siteController = require('../app/controllers/SiteController');
const newsController = require('../app/controllers/NewsController');


let router = express.Router();

let route = (app) => {
  router.get('/news/:slug', newsController.show);
  router.get('/news', newsController.index);
  router.get('/register', siteController.register);
  router.post('/postRegister', siteController.postRegister);
  router.get('/', siteController.home);

  return app.use("/", router);
}

module.exports = route;
