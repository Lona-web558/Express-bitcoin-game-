const express = require("express");
const { auth } = require("./middleware");
const User = require("./User");

const router = express.Router();

let games = {};

router.get("/play", auth, (req, res) => {
    res.render("play");
});

// Create question
router.get("/api/question", auth, (req, res) => {

    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 50) + 1;

    const id = req.user.id;

    games[id] = {
        answer: a + b
    };

    res.json({
        question: `${a} + ${b} = ?`
    });
});

// Submit answer
router.post("/api/answer", auth, async (req, res) => {

    const id = req.user.id;
    const game = games[id];

    if (!game) {
        return res.json({
            correct: false
        });
    }

    const user = await User.findById(id);

    let correct = false;

    if (Number(req.body.answer) === game.answer) {

        correct = true;

        // Reward points
        user.points += 10;

        // Convert points to satoshis (100 points = 1 satoshi)
        user.satoshis = Math.floor(user.points / 100);

        user.correctAnswers += 1;
    }

    user.gamesPlayed += 1;

    await user.save();

    res.json({
        correct,
        points: user.points,
        satoshis: user.satoshis
    });
});

router.get("/dashboard", auth, async (req, res) => {

    const user = await User.findById(req.user.id);

    res.render("dashboard", {
        user
    });
});

module.exports = router;
