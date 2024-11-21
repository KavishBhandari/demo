const { commonFunction } = require("../../Database/config/dbConfig.js");
const { ProductDetail, ProductReview, productImage } = require("../../Database/models");
const createHttpError = require("../utils/httpError.js");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

const addProduct = async (body) => {
    return await commonFunction.create1(ProductDetail, body)
};

const findProductID = async (id) => {
    const Product = await commonFunction.getById(ProductDetail, { id: id });
    if (!Product) {
        throw createHttpError(404, " Product is not found. ");
    }
    return Product;
}

const findAllProducts = async () => {
    const Product = await commonFunction.getAll(ProductDetail);
    if (!Product) {
        throw createHttpError(404, " Product is not found. ");
    }
    return Product;
}

const modifyProduct = async (body, id) => {

    const [affectedRows] = await commonFunction.update(ProductDetail, body, { id });
    if (affectedRows === 0) {
        throw createHttpError(404, "Product not found or no changes made.");
    }
    return true;
}

const removeProduct = async (id) => {

    const deletedRows = await commonFunction.delete(ProductDetail, { id });
    if (deletedRows === 0) {
        throw createHttpError(404, "Product is not deleted.");
    }
    return true;
}

const showProductRes = async (reqQuery) => {

    console.log(" requestQuery : ", reqQuery);

    const order = [
        [reqQuery.sortBy ?? "id", reqQuery.sortOrder && reqQuery.sortOrder.toLowerCase() === "desc" ? "DESC" : "ASC"]
    ];

    const where = reqQuery.search && reqQuery.searchBy ? { [reqQuery.searchBy]: { [Op.like]: `%${reqQuery.search}%` } } : {};

    const showRes = await ProductDetail.findAll({
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('ProductReviews.rating')), 'averageRating'],
                [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('ProductReviews.id'))), 'reviewCount']
            ],
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: productImage,
                attributes: ['image']
            },
            {
                model: ProductReview,
                attributes: ["comment", "rating"]
            }
        ],
        group: ['ProductDetail.id', "productImages.id"],
        order,
        where
    });

    return showRes;
};

const getAllProducts = async (reqQuery) => {
    const order = [
        [reqQuery.sortBy ?? "id", reqQuery.sortOrder && reqQuery.sortOrder.toLowerCase() === "desc" ? "DESC" : "ASC"]
    ];

    const where = reqQuery.search && reqQuery.searchBy 
        ? { [reqQuery.searchBy]: { [Op.like]: `%${reqQuery.search}%` } } 
        : {};

    const getAllProduct = await ProductDetail.findAndCountAll({
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('ProductReviews.rating')), 'averageRating'], // Average rating of reviews
                [sequelize.fn('COUNT', sequelize.col('ProductReviews.id')), 'reviewCount'] // Total review count
            ],
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: productImage,
                attributes: ['image'],
                separate: true 
            },
            {
                model: ProductReview,
                attributes: ["rating", "UserId", "comment"],
                required: false, 
            }
        ],
        where,
        order,
        group: ['ProductDetail.id'], // Group by ProductDetail to get correct count
    });

    return getAllProduct;
};






module.exports = { addProduct, findProductID, findAllProducts, modifyProduct, removeProduct, showProductRes, getAllProducts };