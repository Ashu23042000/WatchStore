const express = require("express");
const router = express.Router();
const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");
const moment = require("moment");
const multer = require("multer");
const path = require("path");
const { response } = require("express");


// multer config-----

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});


let productImg = multer({
    storage: storage
}).single("product_img");


router.get("/", async (req, res) => {

    const orders = await orderModel.find({ status: { $ne: "Delivered" } }, null, { sort: { createdAt: -1 } }).populate("customerId", "-password");

    res.render("admin", { orders, moment });
});


router.get("/add-products", (req, res) => {
    res.render("adminAddProducts");
});


router.post("/add-products", (req, res) => {


    productImg(req, res, async (err) => {
      
        // store in database-----
        const product = new productModel({
            name: req.body.product_name,
            price: req.body.product_price,
            img: req.file.filename
        });

        await product.save();

        res.render("adminAddProducts")

    });
});


module.exports = router;