const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Score = require("./models/Score");

const app = express();
app.use(express.json());

const corsOptions = {
    origin: "https://quiz-app-pro.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

mongoose.connect("mongodb+srv://vignaramtejtelagarapu:<password>@blogspot.np17yrq.mongodb.net/?retryWrites=true&w=majority&appName=Blogspot");

// Endpoint to save or update scores
app.post("/saveScore", (req, res) => {
    const { username, categoryId, correct, incorrect } = req.body;

    Score.findOne({ username })
        .then(userScores => {
            if (userScores) {
                const existingScore = userScores.scores.find(score => score.categoryId === categoryId);

                if (existingScore) {
                    if (correct > existingScore.correct) {
                        existingScore.correct = correct;
                        existingScore.incorrect = incorrect;
                        existingScore.total = correct + incorrect;
                        userScores.save()
                            .then(updatedScore => res.json(updatedScore))
                            .catch(err => res.json(err));
                    } else {
                        res.json(userScores);
                    }
                } else {
                    userScores.scores.push({ categoryId, correct, incorrect, total: correct + incorrect });
                    userScores.save()
                        .then(newScore => res.json(newScore))
                        .catch(err => res.json(err));
                }
            } else {
                const newScore = new Score({
                    username,
                    scores: [{ categoryId, correct, incorrect, total: correct + incorrect }]
                });
                newScore.save()
                    .then(newScore => res.json(newScore))
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
});

app.get("/highscores", (req, res) => {
    Score.find()
        .then(users => {
            const allScores = users.flatMap(user => 
                user.scores.map(score => ({
                    username: user.username,
                    categoryId: score.categoryId,
                    correct: score.correct,
                    incorrect: score.incorrect,
                    total: score.total
                }))
            );

            allScores.sort((a, b) => b.correct - a.correct);
            res.json(allScores);
        })
        .catch(err => res.json(err));
});

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
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
