'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
   
    static associate(models) {

      ProductDetail.hasOne(models.Product, {
        foreignKey: 'ProductId'
      });

      ProductDetail.hasMany(models.productImage, {
        foreignKey: 'ProductId'
      });

      ProductDetail.hasMany(models.ProductReview, {
        foreignKey: 'ProductId'
      })
    }
  }
  ProductDetail.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ProductDetail',
  });
  return ProductDetail;
};