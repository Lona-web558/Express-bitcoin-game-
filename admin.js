const express = require("express");
const { auth, isAdmin } = require("./middleware");

const User = require("./User");
const Withdrawal = require("./User2");

const router = express.Router();

router.get("/admin", auth, isAdmin, async (req, res) => {

    const users = await User.find();

    const withdrawals = await Withdrawal.find()
        .populate("user");

    res.render("admin", {
        users,
        withdrawals
    });

});

module.exports = router;
