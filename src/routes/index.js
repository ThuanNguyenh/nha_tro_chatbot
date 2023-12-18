

const express = require('express');
const UsersController = require('../app/controllers/auth');
const productsController = require('../app/controllers/productsController');
const newsController = require('../app/controllers/NewsController');
const checkPermission = require('../app/middlewares/checkPermission');
const roomController = require('../app/controllers/roomController');


let router = express.Router();

let route = (app) => {
  router.get('/news/:slug', newsController.show);
  router.get('/news', newsController.index);

  // Register
  router.get('/register', UsersController.register);
  router.post('/postRegister', UsersController.postRegister);
  // User
  router.get('/usersList', UsersController.getRegister);
  router.get('/editUser', UsersController.editUser);
  router.post('/put-editUser', UsersController.putEditUser);
  router.get('/deleteUser', UsersController.deleteUserById);
  

  // Login
  router.get('/login', UsersController.login);
  router.post('/api/login', UsersController.handleLogin);

  // Logout
  router.get('/logout', UsersController.logout);

  

  // Room
  router.get('/roomsList', roomController.roomsList);
  router.post('/rooms-create', roomController.roomsCreate);
  router.post('/rooms-edit', roomController.roomsEdit);
  router.delete('/rooms-delete/:id', roomController.roomsDelete);


  // products
  router.get('/productsList', checkPermission.checkLogin, productsController.productsList);
  router.get('/addForm', productsController.Create);
  router.post('/productsCreate', productsController.productsCreate);
  router.get('/editForm', productsController.editForm);
  router.post('/productsEdit', productsController.productsEdit);
  router.get('/delete-product', productsController.deleteProductsById);

  router.get('/', UsersController.home);

  return app.use("/", router);
}

module.exports = route;
