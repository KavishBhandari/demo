const createSuccess = (res, statusCode, successMessage, data) => {
    const successObj = {
        status: statusCode,
        message: successMessage,
        data : data
    }
    return res.send(successObj);
};

module.exports = { createSuccess };