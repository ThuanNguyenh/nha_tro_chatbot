const bcrypt = require("bcryptjs");
const db = require('../app/models/index');

var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        userName: data.userName,
        password: hashPasswordBcrypt,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        gender: data.gender === '1'? true : false,
        roleId: data.roleId,
      });
      resolve('create user success!!');
    } catch (error) {
      reject(error);
    }
  });
};
// Su dung Promise de chac chan rang du lieu se duoc tao
// ma hoa mat khau
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = createNewUser;
