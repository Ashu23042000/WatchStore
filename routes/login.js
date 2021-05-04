const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const userModel = require("../models/userModel");


router.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        res.render("login");
    }
});

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (user) {
            const checkPassword = await bcryptjs.compare(password, user.password);

            if (checkPassword) {
                req.session.user = user;
                res.status(200).redirect("/");
            }
            else {
                res.status(406).render("login", { message: "Password is not match" });
            }
        }
        else {
            res.status(406).render("login", { message: "Cant get user" });
        }
    }
    catch (error) {
        console.log(error);
    }
});


module.exports = router;