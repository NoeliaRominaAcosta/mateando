'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
   
    static associate(models) {
      Image.belongsTo(models.Product,{
        as : 'product',
        foreignKey : 'productId'
      });
    }
  }
  Image.init({
    file: DataTypes.STRING,
    primary: DataTypes.BOOLEAN,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};