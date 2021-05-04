const express = require("express");
const router = express.Router();
const orderModel = require("../models/orderModel");



router.get("/:id", async (req, res) => {

    if (req.session.user) {

        const order = await orderModel.findById({ _id: req.params.id });

        if (order.customerId.toString() === req.session.user._id) {
            res.render("customerOrderStatus", { order });
        } else {
            res.redirect("/");
        }

    } else {
        res.redirect("/");
    }

});


module.exports = router;