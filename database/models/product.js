'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
   
    static associate(models) {
      Product.belongsTo(models.Category,{
        as : 'category',
        foreignKey : 'categoryId'
      });

      Product.hasMany(models.Image,{
        as : 'images',
        foreignKey : 'productId',
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    brand: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};