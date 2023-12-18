// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary').v2;
          
// set up
cloudinary.config({ 
  cloud_name: 'dsemwfhzo', 
  api_key: '326459634881644', 
  api_secret: 'IXjsfOtiNw0gm_mDN6Oop_tT2fE' 
});


// function to upload an image to Cloudinary
function uploadImageToCloudinary(imagePath) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imagePath, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });
  });
}

// Function to insert the Cloudinary URL into the MySQL database
function insertImageUrlIntoDatabase(imageUrl) {
  const sql = 'INSERT INTO `rooc`.`products` (`avatar`) VALUES (?)';
  connection.query(sql, [imageUrl], (err, result) => {
    if (err) {
      console.error('Error inserting URL into database:', err);
    } else {
      console.log('URL inserted into database');
    }
  });
}

// Usage example
async function main() {
  try {
    const imagePath = 'public\img\logoDA.png';
    const imageUrl = await uploadImageToCloudinary(imagePath);
    insertImageUrlIntoDatabase(imageUrl);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();

// Đường dẫn tới file hình ảnh bạn muốn tải lên
// const imagePath = './path/to/your/image.jpg';


// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });