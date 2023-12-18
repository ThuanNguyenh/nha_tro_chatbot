'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  room.init({
    roomnumber: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    member: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    acreage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};

// Thiết lập khóa ngoại từ bảng Room đến bảng Area
// room.belongsTo(area, { foreignKey: 'areaId' });