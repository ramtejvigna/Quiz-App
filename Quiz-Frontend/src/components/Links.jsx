import { Link, useParams } from "react-router-dom";
import '../Links.css';
import '../App.css';

export default function Links() {
  const { userId } = useParams();

  const quizLink = userId ? `/${userId}/quiz` : '/quiz';
  const highScoreLink = userId ? `/${userId}/highscore` : '/highscore';

  return (
    <div className="links">
      <Link to={quizLink} id="link">See Quizzes</Link>
      <Link to={highScoreLink} id="link">High Scores</Link>
    </div>
  );
}
