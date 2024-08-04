const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    scores: [{
        categoryId: {
            type: String,
            required: true
        },
        correct: {
            type: Number,
            required: true
        },
        incorrect: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Score", scoreSchema);
