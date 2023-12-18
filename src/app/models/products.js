'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    gender: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.STRING,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    event: DataTypes.STRING,
    eventTime: DataTypes.STRING,
    avatar: DataTypes.STRING,
    sale: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    sold: DataTypes.STRING,
    inCart: DataTypes.STRING,
    like: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};