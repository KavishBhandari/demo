const { commonFunction } = require("../../Database/config/dbConfig");
const { ProductReview } = require("../../Database/models");
const createHttpError = require("../utils/httpError");

const checkExistReview = async (ProductId, UserId) => {

    if ((await commonFunction.getById(ProductReview, { ProductId, UserId }))) {
        console.log(" ProductId : ", ProductId, " UserId : ", UserId);
        throw createHttpError(404, "Review is already Exist. ");
    }
    return;
};

const createReview = async (ProductId, UserId, body) => {
    
    return await commonFunction.create1(ProductReview, { ProductId, UserId, comment:body.comment, rating:body.rating });
};

module.exports = { checkExistReview, createReview };