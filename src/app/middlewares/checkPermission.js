const jwt = require("jsonwebtoken");
const db = require("../models/index");
const dotenv = require('dotenv');
dotenv.config();


const {SECRET__CODE} = process.env;

const checkLogin = async(req, res, next) => {
    try {

        // kiem tra dang nhap
        const token = req.headers.authorization?.split("")[1];

        // kiem tra token
        if (!token) {
            return res.status(403).json({
                message: "Bạn chưa đăng nhập!"
            })
        }
        
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

// phân quyền
const checkPermission = async (req, res, next) => {
  try {

    // Kiểm tra quyền người dùng
    const decoded = jwt.verify(token, SECRET__CODE);
    const user = await db.user.findById(decoded._id);

    if (!user) {
        return res.status(403).json({
            message: "Token lỗi!",
        })
    }

    // admin = 1
    if (user.roleId !== 1) {
        return res.status(400).json({
            message: "Bạn không có quyền làm việc này!",
        })
    }

    // next
    next();


  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
    checkLogin: checkLogin,
    checkPermission : checkPermission
};

