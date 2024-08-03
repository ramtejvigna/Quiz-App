const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Score = require("./models/Score"); // Assuming you have a Score model

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Quiz-App");

// Endpoint to save or update scores
app.post("/saveScore", (req, res) => {
    const { username, categoryId, correct, incorrect } = req.body;

    Score.findOne({ username, categoryId })
        .then((score) => {
            if (score) {
                // User has already taken the test for this category, update the score if the new score is better
                if (correct > score.correct) {
                    score.correct = correct;
                    score.incorrect = incorrect;
                    score.save()
                        .then(updatedScore => res.json(updatedScore))
                        .catch(err => res.json(err));
                } else {
                    res.json(score); // No update needed
                }
            } else {
                // User has not taken the test for this category, create a new score entry
                Score.create({ username, categoryId, correct, incorrect })
                    .then(newScore => res.json(newScore))
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
});

// New endpoint to check if a user exists
app.get("/userExists/:userId", (req, res) => {
    User.findOne({ username: req.params.userId })
        .then((user) => {
            if (user) {
                res.json({ exists: true });
            } else {
                res.json({ exists: false });
            }
        })
        .catch(err => res.json({ exists: false }));
});

app.post("/signup", (req, res) => {
    User.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post("/signin", (req,res) => {
    const { username, password } = req.body;
    User.findOne({ username })
        .then((user) => {
            if(user) {
                if(password === user.password) {
                    res.json("Success");
                } else {
                    res.json("Password Incorrect");
                }
            } else {
                res.json("User not exist");
            }
        })
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
