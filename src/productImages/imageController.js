const { commonFunction } = require("../../Database/config/dbConfig");
const {productImage} = require("../../Database/models");
const catchAsync = require("../utils/catchAsync");
const { createError } = require("../utils/error");
const { createSuccess } = require("../utils/success");


const uploadImages = catchAsync(async(req, res) => {
    
    if(!req.files){
        return createError(404, "Images are not uploaded");
    }

    console.log(req.files);
    
    const imagesPath = req.files.map((file) => file.path);

    const images = imagesPath.map((imagesPath) => {
        const escapedPath = imagesPath.replace(/\\/g, '/');
        const relativePath = escapedPath.replace("/^public\//", '');

        return {image : `http://localhost:5000/${relativePath}`};
    });

    for(const image of images) {
        await commonFunction.create1(productImage, {image : image.image, ProductId : req.params.id});
    }

    return createSuccess(res, 200, " Images are uploaded Successfully. ");
});

module.exports = { uploadImages };