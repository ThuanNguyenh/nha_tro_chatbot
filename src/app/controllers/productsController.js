const db = require("../models/index");

// productsList [GET]
let productsList = async (req, res) => {
  try {
    let dataProducts = await db.Products.findAll({
      raw: true,
    });

    res.json(dataProducts);
    // console.log(dataProducts);
    // return res.render("products/productsList", {
    //   data: dataProducts,
    // });
  } catch (error) {
    return res.json(error);
  }
};

// CREATE [GET]
let Create = (req, res) => {
    return res.render('products/addProducts');
};

// Create products [POST]
let productsCreate = async (req, res) => {
  try {
    const products = new db.Products({
        name: req.body.name,
        description: req.body.description,
        gender: req.body.gender,
        category: req.body.category,
        price: req.body.price,
        color: req.body.color,
        size: req.body.size,
        event: req.body.event,
        eventTime: req.body.eventTime,
        avatar: req.body.avatar,
        sale: req.body.sale,
        quantity: req.body.quantity,
    });
    await products.save();
    res.status(201).json('add products successful');
  } catch (error) {
    res.status(500).send('Failed.', error);
  }
};

// Edit products Form [GET]
let editForm = async(req, res) => {

    try {
        const productsId = req.query.id;

        const productsData = await db.Products.findOne({
            where: {id: productsId},
            raw: true,
        });

        if (productsId) {
            return res.render('products/editProducts', {
                data : productsData,
            });
        }  else {
            return res.status(404).json('Not found.');
        }

    } catch (error) {
        return res.status(500).json({error: 'EditForm failed.'})
    }

};

// Edit products [POST]
let productsEdit = async(req, res) => {
    try {
        let data = req.body;
        let products = await db.Products.findOne({
            where: {id: data.id},
        });

        if (products) {
            products.avatar = data.avatar;
            products.name = data.name;
            products.gender = data.gender;
            products.category = data.gender;
            products.color = data.color;
            products.size = data.size;
            products.price = data.price;

            await products.save();
            return res.status(200).json('Successful edit.');
        } else {
            return res.status(404).json('NOT  FOUND.');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// delete-product [GET]
let deleteProductsById = async(req, res) => {
    try {
        const productId = req.query.id;
        const product = await db.Products.findOne({
            where: {id: productId}
        });

        if (product) {
            await product.destroy();
            return res.status(200).json('Successful deleted 1 product.')
        } else {
            return res.status(404).json('Not found.')
        }

    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
  productsList: productsList,
  Create: Create,
  productsCreate: productsCreate,
  editForm: editForm,
  productsEdit: productsEdit,
  deleteProductsById: deleteProductsById
};
