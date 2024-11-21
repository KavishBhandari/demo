const catchAsync = require("../utils/catchAsync");
const {addUser, checkCredential, checkExistUser,forgetPasswordToken, resetPassword} = require("./userService.js");
const { createSuccess } = require("../utils/success"); 
const {hashPassword, comparePassword, generateToken} = require("./userHelper");
const { transporter, mailoption } = require("../middleware/nodemailer.js");

const SignupUser = catchAsync( async (req, res)=>{
    
    await checkExistUser(req.body.email); 

    req.body.password = await hashPassword(req.body.password);

    await addUser(req.body);
   
    return createSuccess(res, 200, "Registraion completed. ");

});

const signInUser = catchAsync( async (req, res) => {

    const verifyUser = await checkCredential(req.body.email);

    console.log("verifyUserId : ", verifyUser.id);
    
    await comparePassword(req.body.password, verifyUser.password);

    const token = await generateToken(verifyUser.id);
    
    return createSuccess(res, 200, " Login Success. ", {token});

});

const forgetPassword = catchAsync( async (req, res)=>{ 

    await forgetPasswordToken(req.body.email);

    await transporter.sendMail(mailoption);

    return createSuccess(res, 200, " Token is send for ResetPassword ");
});

const ResetPassword = catchAsync ( async (req, res)=>{ 

    await checkCredential(req.body.email);

    req.body.password = await hashPassword(req.body.password);

    await resetPassword(req.body);

    return createSuccess(res, 200, " Password is reset. ");

});

module.exports = { SignupUser, signInUser, forgetPassword, ResetPassword };