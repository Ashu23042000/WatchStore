const express = require("express");
const router = express.Router();
const productModel = require("../models/productModel");



router.get("/", async (req, res) => {
    const data = await productModel.find({});
    res.render("home", { products: data });
});


module.exports = router;