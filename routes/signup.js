const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const userModel = require("../models/userModel");

router.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        res.render("signup");
    }
});

router.post("/", async (req, res) => {

    const { name, email, phone, password, confirmPassword } = req.body;

    try {

        if (password != confirmPassword) {
            res.status(406).render("signup", "message:Password is not match");
        }
        else {
            const data = await userModel.findOne({ email });

            if (data) {
                return res.status(406).render("signup", { message: "Email is already register" });
            }
            else {

                const hashPassword = await bcryptjs.hash(password, 10);

                const user = await new userModel({
                    name, email, phone, password: hashPassword
                });

                await user.save();

                res.status(201).redirect("/login");
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});

module.exports = router;