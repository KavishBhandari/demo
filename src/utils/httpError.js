/*const createHttpError = async (status, message) => {
    const error = {
        status : status,
        message : message
    }
    return error;
}*/

const createHttpError = (status, message) => {
    const error = new Error(message);//here we creating error instance but we create upper function so express is not able to handle the custom error 
    error.status = status;
    return error;
};
module.exports = createHttpError;