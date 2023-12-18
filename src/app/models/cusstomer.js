'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cusstomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cusstomer.init({
    customername: DataTypes.STRING,
    cartid: DataTypes.INTEGER,
    customerphone: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    profession: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cusstomer',
  });
  return cusstomer;
};