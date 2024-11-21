const upload = require("../middleware/multer");
const { uploadImages } = require("./imageController");

const express = require("express");
const router = express.Router();

router.post("/productImages/:id", upload, uploadImages)

module.exports = router;