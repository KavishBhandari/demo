const express = require("express");
const router = require("./routes/index.js");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
app.use("/uploads", express.static(path.join(__dirname, "./public/uploads")));

app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || " Something Went Wrong. ";
    return res.json({
        status : [200, 201, 204].some(a=> a === obj.status) ? true : false,
        status : statusCode,
        message : message,
        data : obj.data
    });
});

app.listen(process.env.port, () => {
    console.log(`server is listening on the ${process.env.port} port. `);
});

