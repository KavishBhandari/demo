const catchAsync = require("../utils/catchAsync");
const { createSuccess } = require("../utils/success");
const {checkExistReview, createReview} = require("./reviewService.js");

const giveReview = catchAsync(async(req, res) => {
    
    await checkExistReview(req.params.id, req.data.id);
    await createReview(req.params.id, req.data.id, req.body);
    return createSuccess(res, 200, " Thankyou For Giving Review. ");

});

module.exports = {giveReview};