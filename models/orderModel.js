const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    totalBill: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Placed"
    },
    paymentType: {
        type: String,
        default: "COD"
    }
}, { timestamps: true });

const orderModel = new mongoose.model("order", orderSchema);

module.exports = orderModel;