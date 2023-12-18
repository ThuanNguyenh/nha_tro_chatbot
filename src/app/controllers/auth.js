const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { SECRET_CODE} = process.env;

// [GET] / home
let home = (req, res) => {
  if (req.session.user) {
    return res.render("home", {
      username: req.session.user.username,
    });
  } else {
    return res.render("home");
  }
};

// register [GET]
let register = (req, res) => {
  return res.render("accounts/register");
};

// [POST] Register
// Kiểm tra định dạng email hợp lệ
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
// Kiểm tra độ mạnh mật khẩu
function isStrongPassword(password) {
  // Cần chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 chữ số và ít nhất 8 ký tự
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}
// Create [POST]
let postRegister = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;

    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.password ||
      !req.body.phone ||
      !req.body.address
    ) {
      return res
        .status(404)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    // hash Password
    const hashPasswordBcrypt = await bcrypt.hash(password, 10);

    // do manh cua mat khau
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Mật khẩu chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 chữ số và ít nhất 8 ký tự",
      });
    }

    // kiem tra dinh dang email
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Email không hợp lệ" });
    }

    if (!db || !db.user) {
      // Xử lý lỗi hoặc trả về phản hồi lỗi tại đây nếu đối tượng db hoặc db.user không tồn tại
      return res.status(500).json({ message: "Lỗi kết nối đến database" });
    }

    // check email

    const existingEmail = await db.user.findOne({
      where: { email: req.body.email },
    });
    if (existingEmail) {
      return res.status(409).json({ message: "Địa chỉ email đã tồn tại" });
    }

    const user = new db.user({
      username,
      email,
      password: hashPasswordBcrypt,
      phone,
      address,
    });
    await user.save();
    res.status(200).json({ message: "Tạo tài khoản thành công" });
  } catch (error) {
    console.log("lỗi: ", error);
    res
      .status(500)
      .json({ message: "Tạo tài khoản thất bại, vui lòng thử lại!" });
  }
};

// [GET] data from postRegiter
let getRegister = async (req, res) => {
  try {
    let dataUser = await db.user.findAll({
      raw: true,
    });
    return res.json(dataUser);
    // return res.render("accounts/dataUser", {
    //   userTable: dataUser,
    // });
  } catch (error) {
    return res.json(error);
  }
};

// [GET] Login
let login = async (req, res) => {
  return res.render("accounts/login");
};

// [POST] Login
let handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.user.findOne({ where: { username } });
    // console.log(user);

    // kiểm tra user
    if (!user) {
      res.status(404).json({ error: "Tên đăng nhập không tồn tại" });
      return;
    }

    // kiểm tra password
    const isPassWordValid = await bcrypt.compare(password, user.password);
    if (isPassWordValid) {
      req.session.user = user;      
    } else {
      res.status(401).json({ error: "Mật khẩu không đúng" });
    }

    // Tạo JWT
    const accessToken = jwt.sign({_id: user._id}, SECRET_CODE, { expiresIn: "1d"});

    // trả thông báo cho người dùng
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      user,
      accessToken
    })


  } catch (error) {
    // return res.status(500).json({ error: "Đã xãy ra lỗi, vui lòng thử lại" });
    console.log("lỗi: ", error);
  }
};

// [GET] Logout
let logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

// Edit User
let editUser = async (req, res) => {
  try {
    let userId = req.query.id;

    let userData = await db.User.findOne({
      where: { id: userId },
      raw: true,
    });

    if (userId) {
      return res.render("accounts/editUser", {
        user: userData,
      });
    } else {
      return res.send("no user");
    }
  } catch (error) {
    return res.send(error);
  }
};

// PUT edit user
let putEditUser = async (req, res) => {
  try {
    let data = req.body;
    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.email = data.email;
      user.phone = data.phone;
      user.address = data.address;
      user.gender = data.gender;
      user.roleId = data.roleId;

      await user.save();

      return res.redirect("/getRegister");
    } else {
      return res.send("no user");
    }
  } catch (error) {
    return res.send(error);
  }
};

// delete user by id
let deleteUserById = async (req, res) => {
  try {
    let userId = req.query.id;
    let user = await db.User.findOne({
      where: { id: userId },
    });

    if (user) {
      await user.destroy();

      return res.redirect("/getRegister");
    } else {
      return res.json("no user");
    }
  } catch (error) {
    return res.json(error);
  }
};

// tạo một đối tượng SiteController và exports ra ngoài
module.exports = {
  home: home,
  register: register,
  postRegister: postRegister,
  login: login,
  handleLogin: handleLogin,
  logout: logout,
  getRegister: getRegister,
  editUser: editUser,
  putEditUser: putEditUser,
  deleteUserById: deleteUserById,
};
