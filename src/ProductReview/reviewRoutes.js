const authenticateUser = require("../middleware/auth.js");
const {giveReview} = require("./reviewController.js");

const express = require("express");
const router = express.Router();

router.post("/givereview/:id", authenticateUser, giveReview);

module.exports = router;