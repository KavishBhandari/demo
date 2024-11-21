'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductReview extends Model {
    static associate(models) {
      ProductReview.belongsTo(models.ProductDetail, {
        foreignKey: 'ProductId'
      });

      ProductReview.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  }
  ProductReview.init({
    comment: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    rating: {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
    ProductId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      references : {
        model : "ProductDetails",
        key : "id"
      }
    }, 
    UserId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      references : {
        model : "Users",
        key : "id"
      }
    }, 
  },
   {
    sequelize,
    modelName: 'ProductReview',
  });
  return ProductReview;
};