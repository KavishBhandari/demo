const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service :'gmail',
    secure : false,
});

const mailoption = {
    from : "kavishbhandari5@gmail.com",
    to : "kavibhndari2002@gmail.com",
    subject : " Forget Password Token. ",
    text : " Learn Forget Password API. "
};

module.exports = {transporter, mailoption};