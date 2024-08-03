import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { Link, useParams } from 'react-router-dom';
import Spinner from './Spinner';

const QuizPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useParams();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api_category.php');
                setCategories(response.data.trivia_categories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Header user={userId} />
            <div>
                <h1>Select Categories</h1>
                <div className="grid grid-cols-3">
                    {
                        categories.map(category => (
                            <Link to={`/quizzes/${category.id}`}>
                                <div key={category.id} className=" p-24 m-10 border border-sky-200 rounded-xl" style={{backgroundColor: "rgb(0, 29, 69)", boxShadow: "0 2px 4px 4px rgba(214, 214, 214, 0.37)"}}>
                                    <h2 className="text-2xl">{category.name}</h2>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default QuizPage;
