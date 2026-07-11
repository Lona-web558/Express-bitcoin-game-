const express = require("express");
const { auth } = require("./middleware");
const User = require("./User");
const Withdrawal = require("./User2");

const router = express.Router();

router.get("/wallet", auth, async (req, res) => {

    const user = await User.findById(req.user.id);

    res.render("wallet", {
        user
    });
});

router.post("/wallet", auth, async (req, res) => {

    const user = await User.findById(req.user.id);

    user.wallet.address = req.body.wallet;
    user.wallet.type = req.body.type || user.wallet.type;

    await user.save();

    res.redirect("/wallet");
});

router.post("/withdraw", auth, async (req, res) => {

    const user = await User.findById(req.user.id);
    const amount = Number(req.body.amount);

    const MINIMUM = Number(process.env.MINIMUM_WITHDRAWAL) || 500;
    const MAXIMUM = Number(process.env.MAXIMUM_WITHDRAWAL) || 100000;

    if (!amount || amount < MINIMUM) {
        return res.send(`Minimum withdrawal is ${MINIMUM} sats.`);
    }

    if (amount > MAXIMUM) {
        return res.send(`Maximum withdrawal is ${MAXIMUM} sats.`);
    }

    if (amount > user.satoshis) {
        return res.send("Insufficient balance.");
    }

    if (!user.wallet.address) {
        return res.send("Please save your Bitcoin wallet first.");
    }

    const withdrawal = new Withdrawal({
        user: user._id,
        amount: amount,
        wallet: user.wallet.address,
        status: "Pending"
    });

    await withdrawal.save();

    // Deduct balance
    user.satoshis -= amount;
    await user.save();

    res.redirect("/wallet");
});

router.get("/history", auth, async (req, res) => {

    const withdrawals = await Withdrawal.find({
        user: req.user.id
    }).sort({ createdAt: -1 });

    res.render("history", {
        withdrawals
    });
});

module.exports = router;