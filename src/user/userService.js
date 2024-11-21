const { commonFunction } = require("../../Database/config/dbConfig");
const { User } = require("../../Database/models");
const createHttpError = require("../utils/httpError");
const { v4: uuidv4 } = require("uuid");

const checkExistUser = async (payloadEmail) => {
    
    if ((await commonFunction.getById(User, { email: payloadEmail }))) {
        throw createHttpError(500, " User is already exist. ");
    }
    return;
};

const addUser = async (payload) => {

    return await commonFunction.create1(User, payload);
};

const checkCredential = async (payloadEmail) => {

    const getCreadential = await commonFunction.getById(User, { email: payloadEmail })
    if(!getCreadential){
        throw createHttpError(200, " UserCredential are Invalid . ");
    }
    return getCreadential;
}

const resetPassword = async (bodyData) => {

    const verifyToken = await commonFunction.getById(User, { resetPasswordToken: bodyData.resetPasswordToken });
    if (!verifyToken) {
        throw createHttpError(200, " Please enter correct token. ");
    }
    verifyToken.resetPasswordToken = null;
    verifyToken.resetPasswordExpires = null;
    await verifyToken.save();
    return;
}

const forgetPasswordToken = async (payloadEmail) => {

    const findUser = await commonFunction.getById(User, { email: payloadEmail });
    if (!findUser) {
        throw createHttpError(200, " UserCredential are Invalid . ");
    }
    findUser.resetPasswordToken = uuidv4();
    findUser.resetPasswordExpires = new Date(Date.now() + 12000);
    await findUser.save();
    return;
};

module.exports = { checkExistUser, addUser, checkCredential, resetPassword, forgetPasswordToken };