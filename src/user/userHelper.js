const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const createHttpError = require("../utils/httpError");

const hashPassword = async (bodyPassword) => {
    return await bcrypt.hash(bodyPassword, 10);
};

const comparePassword = async (bodyPassword, existPassword) => {

    if(!(await bcrypt.compare(bodyPassword, existPassword))){
        return createHttpError(200, " User Not Found. ");
    }
};

const generateToken =  async (userId) => {

    const token = await JWT.sign({id: userId}, process.env.JWT_SECERET);
    if(!token){
        return createHttpError(200, " Token is not generated. ");
    }
    return token;
};

module.exports = {hashPassword, comparePassword, generateToken};