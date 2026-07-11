const jwt = require("jsonwebtoken");
const User = require("./User");

// Checks the JWT cookie and attaches req.user
async function auth(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.redirect("/login");
    }
}

// Only allows through if the logged-in user is an admin.
// Must run AFTER auth() so req.user is already set.
async function isAdmin(req, res, next) {

    const user = await User.findById(req.user.id);

    if (!user || !user.isAdmin) {
        return res.status(403).send("Access Denied");
    }

    next();
}

module.exports = { auth, isAdmin };
