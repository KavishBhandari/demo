'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
  
    static associate(models) {
      Product.belongsTo(models.ProductDetail, {
        foreignKey : 'ProductId'
      })
    }
  }
  Product.init({
    ProductId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      references : {
        model : "ProductDetails",
        key : "id"
      }
    } 
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};