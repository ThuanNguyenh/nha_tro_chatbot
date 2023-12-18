const db = require("../models/index");
const fs = require("fs");

// Rooms-List [GET]
let roomsList = async (req, res) => {
  try {
    let dataRooms = await db.room.findAll({
      raw: true,
    });
    res.json(dataRooms);
  } catch (error) {
    return res.status(500).json("error: ", error);
  }
};

// Create room [POST]
let roomsCreate = async (req, res) => {
  try {
    // Đọc file ảnh và chuyển thành base64
    // const imageBuffer = fs.readFileSync(req.body.image);
    // const base64Image = imageBuffer.toString("base64");

    const rooms = new db.room({
      roomnumber: req.body.roomnumber,
      image: req.body.image,
      price: req.body.price,
      member: req.body.member,
      description: req.body.description,
      address: req.body.address,
      acreage: req.body.acreage,
    });

    await rooms.save();
    res.status(200).json({ message: "add room successful!" });
  } catch (error) {
    // Xác định mã lỗi và thông báo từ đối tượng lỗi
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";

    // Sử dụng res.status(status).json(obj) để trả về lỗi
    res.status(statusCode).json({ error: errorMessage });
  }
};

// Edit room [POST]
let roomsEdit = async (req, res) => {
  try {
    let data = req.body;
    let rooms = await db.room.findOne({
      where: { id: data.id },
    });
    if (rooms) {
      (rooms.roomnumber = data.roomnumber),
        (rooms.image = data.image),
        (rooms.price = data.price),
        (rooms.member = data.member),
        (rooms.description = data.description),
        await rooms.save();
      return res.status(200).json("Successful update!");
    } else {
      return res.status(400).json("Room not found.");
    }
  } catch (error) {
    return res.status(500).json("error: ", error);
  }
};

// Delete room [GET]
let roomsDelete = async (req, res) => {
  try {
    const room = await db.room.findOne({
      where: { id: req.params.id },
    });

    // console.log("thong tin room: ", room);

    if (room) {
      await room.destroy();
      return res.status(200).json("Successful delete!");
    } else {
      return res.status(400).json({error: "room not found"});
    }
  } catch (error) {
    return res.status(500).json("error: ", error);
  }
};

module.exports = {
  roomsList: roomsList,
  roomsCreate: roomsCreate,
  roomsEdit: roomsEdit,
  roomsDelete: roomsDelete,
};
