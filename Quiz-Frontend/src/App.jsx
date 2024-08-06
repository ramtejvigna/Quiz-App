import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import Spinner from './components/Spinner.jsx';
import HighScore from './components/HighScore.jsx';

function App() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('https://quiz-app-sigma-lilac.vercel.app/highscores'); // Update the URL to match your backend endpoint
        setScores(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <div>
        <h1>High Scores</h1>
        <HighScore scores={scores} loading={loading} />
      </div>
    </>
  );
}

export default App;
