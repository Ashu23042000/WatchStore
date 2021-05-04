const express = require("express");
const router = express.Router();
const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");
const moment = require("moment");

router.get("/", async (req, res) => {

    // await productModel.insertMany([{
    //     name: "Watch1",
    //     price: 2000,
    //     img: "./Img/watch1.jpg"
    // },
    // {
    //     name: "Watch2",
    //     price: 2500,
    //     img: "./Img/watch2.jpg"
    // },
    // {
    //     name: "Watch3",
    //     price: 2600,
    //     img: "./Img/watch3.jpg"
    // },
    // {
    //     name: "Watch4",
    //     price: 3000,
    //     img: "./Img/watch4.jpg"
    // }]);

    const orders = await orderModel.find({ status: { $ne: "Delivered" } }, null, { sort: { createdAt: -1 } }).populate("customerId", "-password");

    res.render("admin", { orders, moment });
});



module.exports = router;