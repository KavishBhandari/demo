const catchAsync = require("../utils/catchAsync.js");
const { createSuccess } = require("../utils/success.js");
const {addProduct, findProductID, modifyProduct, removeProduct, findAllProducts, showProductRes, getAllProducts} = require("./productServices.js");

const createProduct = catchAsync( async(req, res) => {

    await addProduct(req.body);
    return createSuccess(res, 200, " Product is created successfully. ");
}); 

const getProduct = catchAsync( async(req, res) => {

    const product = await findProductID(req.params.id);
    return createSuccess(res, 200, " Product : ", product);
});

const geAlltProduct = catchAsync( async(req, res) => {

    const getAll = await findAllProducts(req.params.id);
    return createSuccess(res, 200, " All Products . ", getAll);
});

const updateproduct = catchAsync( async(req, res) => {

    await modifyProduct(req.body, req.params.id);
    return createSuccess(res, 200, " Product is updated successfully. ");
});

const deieteProduct = catchAsync( async(req, res) => {

    await removeProduct(req.params.id);
    return createSuccess(res, 200, " Product is deleted successfully. ");
});

const productRes = catchAsync( async(req, res) => {

    const product = await showProductRes(req.query); 
    return createSuccess(res, 200, " ProductRes is shown successfully. ", product);
});

const AllProductsWithPagination = catchAsync( async(req, res) => {

    const product = await getAllProducts(req.query); 
    return createSuccess(res, 200, " ProductRes is shown successfully. ", product);
});

module.exports = {createProduct, getProduct, geAlltProduct, updateproduct, deieteProduct, productRes, AllProductsWithPagination};