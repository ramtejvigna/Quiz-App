import React, { useEffect, useState } from "react";
import "../Links.css"; // Ensure you import the CSS file for the styles
import Spinner from "./Spinner";
import Header from "./Header";
import { useParams } from "react-router-dom";

export default function HighScore({ scores, loading }) {
    const [totalMap, setTotalMap] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        let map = {};
        if (scores) {
            scores.forEach((score) => {
                if (score.username in map) {
                    map[score.username] += score.total;
                } else {
                    map[score.username] = score.total;
                }
            });
            setTotalMap(map);
        }
    }, [scores]);

    const uniqueUsers = Object.keys(totalMap);

    return (
        <>
            <Header user={userId} />
            <div className="high-score-table">
            {loading ? (
                <Spinner />
            ) : uniqueUsers.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Total Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uniqueUsers.map((username, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{username}</td>
                                <td>{totalMap[username]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
        </>
    );
}
