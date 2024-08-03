const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
    username: { type: String, required: true },
    categoryId: { type: String, required: true },
    correct: { type: Number, required: true },
    incorrect: { type: Number, required: true }
});

module.exports = mongoose.model("Score", ScoreSchema);
