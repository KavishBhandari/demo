const authenticateUser = require("../src/middleware/auth.js");

const product = require("../src/productDetail/productRoutes.js");
const user = require("../src/user/userRoutes.js");
const review = require("../src/ProductReview/reviewRoutes.js");

const express = require("express");
const router = express.Router();

router.use("/product", authenticateUser, product);
router.use("/user", user);
router.use("/productReview", authenticateUser, review);


module.exports = router;