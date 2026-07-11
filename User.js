const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    points: {
        type: Number,
        default: 0
    },

    satoshis: {
        type: Number,
        default: 0
    },

    wallet: {

        address: {
            type: String,
            default: ""
        },

        type: {
            type: String,
            default: "bitcoin"
        },

        verified: {
            type: Boolean,
            default: false
        }

    },

    gamesPlayed: {
        type: Number,
        default: 0
    },

    correctAnswers: {
        type: Number,
        default: 0
    },

    isAdmin: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model("User", UserSchema);
