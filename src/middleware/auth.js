const JWT = require("jsonwebtoken");
const { createError } = require("../utils/error");
const arr = require("../utils/constant");
const { match } = require('path-to-regexp'); // Import the match function

const authenticateUser = async (req, res, next) => {
    console.log(req.path, "***************** req.path *************");
    console.log(req.originalUrl, "***************** req.originalUrl *************");

    const token = req.headers['authorization'];

    if (!token) {
        return createError(res, 401, "User is not Authenticated.");
    }
    console.log(token);

    try {
        // Check if the path matches any pattern in the array
        const matchedRoute = arr.some(pattern => {
            const matcher = match(pattern, { decode: decodeURIComponent }); // Create a matcher
            return matcher(req.path); // Check if req.path matches the pattern
        });

        if (matchedRoute) {
            console.log(process.env.JWT_SECERET);

            const decodedToken = JWT.verify(token, process.env.JWT_SECERET);
            req.data = decodedToken;
            console.log(req.data);

            next(); // Proceed to the next middleware
        } else {
            throw new Error("URL not included.");
        }

    } catch (err) {
        console.log(err.message);
        return createError(res, 401, "Invalid or Expired Token.");
    }
};

module.exports = authenticateUser;
/*const JWT = require("jsonwebtoken");
const { createError } = require("../utils/error");
const arr = require("../utils/constant");

const authenticateUser = async (req, res, next) => {
    console.log(req.path, "***************** req.path *************");
    console.log(req.originalUrl, "***************** req.originalUrl *************");

    const token = req.headers['authorization'];

    if (!token) {
        return createError(res, 401, "User is not Authenticated.");
    }
    console.log(token);

    try {
        if (arr.includes(req.path)) {
            console.log(process.env.JWT_SECERET);

            const decodedToken = JWT.verify(token, process.env.JWT_SECERET);
            req.data = decodedToken;
            console.log(req.data);

            next(); // Proceed to the next middleware
        }
        else{
            throw new Error(" url not included. ");
        }

    } catch (err) {
        console.log(err.message);
        return createError(res, 401, "Invalid or Expired Token.");
    }
};

module.exports = authenticateUser;*/
