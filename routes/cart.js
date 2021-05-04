const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("cart");
});

router.post("/", (req, res) => {
    // console.log(typeof (req.body.price));
    // Check whether cart is present in session or not---
    if (!req.session.cart) {
        req.session.cart = {
            items: {},
            totalQty: 0,
            totalPrice: 0
        }
    }

    let cart = req.session.cart;
    // Check whether item is present in cart or not----

    if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
            item: req.body,
            qty: 1
        }
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
    } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
    }

    res.status(201).json({ message: "Item added to cart succesfully" });
});


module.exports = router;