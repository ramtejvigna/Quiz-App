import React, { useEffect, useState } from "react";
import "../index.css";
import { NavLink, Link, useParams } from "react-router-dom";

export default function Header() {
    const { userId } = useParams();
    const [userExists, setUserExists] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3001/userExists/${userId}`)
                .then(response => response.json())
                .then(data => setUserExists(data.exists))
                .catch(err => console.error("Error fetching user existence:", err));
        }
    }, [userId]);

    const toggleLogout = () => {
        setShowLogout(prev => !prev);
    };

    const homeLink = userId ? `/${userId}` : '/';
    const aboutLink = userId ? `/${userId}/about` : '/about';
    const quizLink = userId ? `/${userId}/quiz` : '/quiz';

    return (
        <header className="p-5 px-4 bg-black">
            <nav className="navbar flex flex-row justify-between items-center">
                <div className="nav-left">
                    <NavLink to={homeLink}>
                        <h1 className="px-10">Quiz App</h1>
                    </NavLink>
                </div>
                <div className="nav-right flex items-center flex-row w-1/3">
                    <ul className="flex flex-row justify-evenly items-center w-full">
                        <li>
                            <NavLink
                                to={homeLink}
                                className={({ isActive }) =>
                                    isActive ? "text-cyan-300" : ""
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={aboutLink}
                                className={({ isActive }) =>
                                    isActive ? "text-cyan-300" : ""
                                }
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={quizLink}
                                className={({ isActive }) =>
                                    isActive ? "text-cyan-300" : ""
                                }
                            >
                                Quiz
                            </NavLink>
                        </li>
                        {
                            userExists ? (
                                <li className="relative">
                                    <a href="#" onClick={toggleLogout}>
                                        <img src="" alt="User" />
                                    </a>
                                    {showLogout && (
                                        <div id="logout" className="absolute top-full mt-2">
                                            <a href="#" className="text-cyan-300">Logout</a>
                                        </div>
                                    )}
                                </li>
                            ) : (
                                <li>
                                    <Link to='/signin'>
                                        <button>
                                            Signin
                                        </button>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
}
