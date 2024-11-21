const { createProduct, getProduct, geAlltProduct, updateproduct, deieteProduct, productRes, AllProductsWithPagination } = require("./productController.js");
const  productImages  = require("../productImages/imagesRoutes.js");

const express = require("express");
const router = express.Router();

router.post("/createProduct", createProduct);
router.get("/getProduct", geAlltProduct);
router.get("/productRes", productRes);
router.get("/getProduct/:id", getProduct);
router.put("/updateproduct/:id", updateproduct);
router.delete("/delete/:id", deieteProduct);
router.get("/allProducts", AllProductsWithPagination);

router.use("/images", productImages)

module.exports = router;