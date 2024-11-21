'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productImage extends Model {

    static associate(models) {
      productImage.belongsTo(models.ProductDetail, {
        foreignKey: 'ProductId'
      })
    }
  }
  productImage.init({
    image:{ 
      type: DataTypes.STRING 
    },
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
    modelName: 'productImage',
  });
  return productImage;
};