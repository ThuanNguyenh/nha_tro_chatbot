const express = require('express');
const router = express.Router();

// import NewsController để lấy cái function handler
const newsController = require('../app/controllers/NewsController');

// news - xay dung cai path
router.use('/:slug', newsController.show);


router.use('/', newsController.index);


module.exports = router;