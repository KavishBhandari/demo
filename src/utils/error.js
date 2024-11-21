const createError = (res, statusCode, errorMessage) => {
    const errorObj = {
        status : statusCode,
        message : errorMessage
    }
    return res.send(errorObj);
};

module.exports = {createError};
