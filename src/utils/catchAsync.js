const { createError } = require("./error");

const catchAsync = (takefun) =>{
    return async(req, res, next) => {
        try {
            return await takefun(req, res, next);
        } catch (error) {
            //next(error);
            return createError(res, 400, error.message);
        }
    }
}

module.exports = catchAsync;