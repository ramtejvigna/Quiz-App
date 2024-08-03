import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./QuizPage.css";
import Header from "./Header.jsx";
import Spinner from "./Spinner.jsx";

export default function QuizQuestions() {
    const { categoryId, userId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        try {
            const url = `https://opentdb.com/api.php?amount=5&category=${categoryId}`;
            let response = await fetch(url);

            if (response.status === 429) {
                console.error("Too many requests. Please try again later.");
                setLoading(false);
                return;
            }

            let parseData = await response.json();
            if (parseData.results && parseData.results.length > 0) {
                const questionsWithShuffledAnswers = parseData.results.map(
                    (question) => ({
                        ...question,
                        shuffledAnswers: shuffleArray([
                            question.correct_answer,
                            ...question.incorrect_answers,
                        ]),
                    })
                );
                setQuestions(questionsWithShuffledAnswers);
            } else {
                setQuestions([]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching questions:", error);
            setLoading(false);
        }
    }, [categoryId]);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            fetchQuestions();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [fetchQuestions]);

    const handleAnswerChange = (question, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [question]: answer,
        }));
    };

    const handleSubmit = () => {
        let correctCount = 0;
        let incorrectCount = 0;

        questions.forEach((question) => {
            if (answers[question.question] === question.correct_answer) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        });

        setResults({
            correct: correctCount,
            incorrect: incorrectCount,
        });

        // Saving the scores to the database
        fetch('http://localhost:3001/saveScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userId, // assuming userId is the username in your case
                categoryId,
                correct: correctCount,
                incorrect: incorrectCount,
            }),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error saving score:', error));
    };

    return (
        <>
            <Header />
            <div className="question-container">
                <h2 className="text-3xl mb-7">Quiz Questions</h2>
                {loading ? (
                    <Spinner />
                ) : questions && questions.length > 0 ? (
                    <>
                        <ul>
                            {questions.map((question) => (
                                <li
                                    key={question.question}
                                    className="question mb-7 rounded-xl"
                                >
                                    <h3 className="p-6 px-8 text-lg">{question.question}</h3>
                                    {question.shuffledAnswers.map((answer, index) => (
                                        <label
                                            key={index}
                                            className="font-light p-6 px-8 flex align-center cursor-pointer hover:bg-gray-900"
                                        >
                                            <input
                                                type="radio"
                                                name={question.question}
                                                value={answer}
                                                onChange={() =>
                                                    handleAnswerChange(question.question, answer)
                                                }
                                                className="cursor-pointer"
                                            />
                                            <span className="mx-10">{answer}</span>
                                        </label>
                                    ))}
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleSubmit} type="button" className="submit-btn">
                            Submit
                        </button>
                    </>
                ) : (
                    <p>No questions found for this category.</p>
                )}
                {results && (
                    <div className="results bg-cyan-800">
                        <p>Correct answers: {results.correct}</p>
                        <p>Incorrect answers: {results.incorrect}</p>
                    </div>
                )}
            </div>
        </>
    );
}
