const express = require("express");
const router = express.Router();
const orderModel = require("../models/orderModel");



router.post("/", async (req, res) => {
    const { address, phone } = req.body;
    const newOrder = new orderModel({
        customerId: req.session.user._id,
        items: req.session.cart.items,
        address,
        phone,
        totalBill: req.session.cart.totalPrice
    });

    await newOrder.save();
    res.redirect("/customer-orders");
});


router.post("/update-order", async (req, res) => {
    const { status, order_id } = req.body;

    await orderModel.updateOne({ _id: order_id }, { status });

    // Emitting data to server---

    const event_emitter = req.app.get("eventEmitter");
    event_emitter.emit("updateOrder", { status, order_id });

    res.redirect("/admin");

});


module.exports = router;