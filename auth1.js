const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const User = require("./User");

const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register");
});

router.post(
    "/register",
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send(errors.array());
        }

        const { username, email, password } = req.body;

        const existing = await User.findOne({ email });

        if (existing) {
            return res.send("Email already registered.");
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hash
        });

        await user.save();

        res.redirect("/login");
    }
);

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.send("Invalid credentials.");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return res.send("Invalid credentials.");
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict"
    });

    res.redirect("/dashboard");
});

module.exports = router;
