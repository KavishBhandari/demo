const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        return cb(null, "public/uploads");
    },

    filename : (req, file, cb) => {
       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    }
});

const upload = multer ({
    storage : storage,
    limits : { fileSize : 5 * 1024 * 1024 },
    fileFilter : (req, file, cb) =>{
        const filetypes = /jpeg|jpg|png/;
        if(filetypes.test(path.extname(file.originalname).toLowerCase())){
            cb(null, true);
        }else{
            cb(" Error only JPEG and PNG images are allowed. ");
        }
    }
}).array("image", 10);

module.exports = upload;
