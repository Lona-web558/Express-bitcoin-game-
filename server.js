require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

// Views (flat structure - all .ejs files live in the project root)
app.set("views", __dirname);
app.set("view engine", "ejs");

// Core middleware - must come BEFORE routes that read req.body / req.cookies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Only serve the exact static files pages need.
// (Not express.static(__dirname) - that would publicly expose server.js,
// User.js, .env, and every other source file in the project.)
app.get("/style.css", (req, res) => res.sendFile(path.join(__dirname, "style.css")));
app.get("/quiz.js", (req, res) => res.sendFile(path.join(__dirname, "quiz.js")));

// Database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.use("/", require("./auth1"));  // /register, /login
app.use("/", require("./routes")); // /play, /api/question, /api/answer, /dashboard
app.use("/", require("./wallet")); // /wallet, /withdraw, /history
app.use("/", require("./admin"));  // /admin

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
