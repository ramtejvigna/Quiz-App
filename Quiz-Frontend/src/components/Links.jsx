import { Link, useParams } from "react-router-dom";
import '../Links.css';
import '../App.css';
import { useState } from "react";

export default function Links() {
  const { userId } = useParams();
  const [userExists, setUserExists] = useState(false);

  const quizLink = userId ? `/${userId}/quiz` : '/quiz';
  const highScoreLink = userId ? `/${userId}/highscore` : '/highscore';

  useEffect(() => {
    if (userId && userId !== 'undefined') {
        fetch(`https://quiz-app-sigma-lilac.vercel.app/userExists/${userId}`)
            .then(response => response.json())
            .then(data => setUserExists(data.exists))
            .catch(err => console.error("Error fetching user existence:", err));
    }
}, [userId]);

  return (
    <div className="links">
      {
        userExists ? (
          <Link to={quizLink} id="link">See Quizzes</Link>
        ) : (
          <h3>To See quizzes, You have to SignUp</h3>
        )
      }
      <Link to={highScoreLink} id="link">High Scores</Link>
    </div>
  );
}
