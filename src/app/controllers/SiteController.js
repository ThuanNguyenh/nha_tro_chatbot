
const db = require('../models/index');
const createNewUser = require('../../services/CRUDService');

class SiteController {

  // [GET] / -- function handler
  home = async (req, res) => {
    try {
      let data = await db.User.findAll();
      return res.render('home', {
        data: JSON.stringify(data),// lấy ra data và và chuyển data thành chuỗi(JSON.stringify)
      });
    } catch (error) {
      console.log(error);
    }
  };

  // register [GET]
  register = (req, res) => {
    return res.render('register');
  }

  postRegister = async (req, res) => {
    let message = await createNewUser(req.body);
    console.log(message);
    return res.send('oke!!!');
  }

}

// tạo một đối tượng SiteController và exports ra ngoài
module.exports = new SiteController();
