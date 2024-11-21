const { SignupUser, signInUser, forgetPassword, ResetPassword } = require("./userController.js");

const express = require("express");
const router = express.Router();

router.post("/signup", SignupUser);
router.post("/signin", signInUser);
router.put("/forgetpassword", forgetPassword);
router.put("/resetpasswrd", ResetPassword);

module.exports = router;