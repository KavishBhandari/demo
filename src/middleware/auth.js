const JWT = require("jsonwebtoken");
const { createError } = require("../utils/error");

const authenticateUser = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return createError(res, 401, "User is not Authenticated.");
    }
    console.log(token);
    
    try {
        console.log(process.env.JWT_SECERET);
        
        const decodedToken = JWT.verify(token, process.env.JWT_SECERET);
        req.data = decodedToken;
        console.log(req.data);
        
        next(); // Proceed to the next middleware
    } catch (err) {
        console.log(err.message);
        
        return createError(res, 401, "Invalid or Expired Token.");
    }
};

module.exports = authenticateUser;
