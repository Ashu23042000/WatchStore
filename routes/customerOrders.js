const express = require("express");
const router = express.Router();
const orderModel = require("../models/orderModel");



router.get("/", async (req, res) => {
    if (req.session.user) {
        const myOrders = await orderModel.find({ customerId: req.session.user._id }, { sort: { "createdAt": -1 } });
        res.render("customerOrders", { orders: myOrders });
    } else {
        res.redirect("/login");
    }

});


module.exports = router;