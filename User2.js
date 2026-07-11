const mongoose = require("mongoose");

const WithdrawalSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    wallet: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    txid: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Withdrawal", WithdrawalSchema);
