import React, { useEffect, useState } from "react";
import "../index.css";
import { NavLink, Link, useParams } from "react-router-dom";

export default function Header() {
    const { userId } = useParams();
    const [userExists, setUserExists] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    useEffect(() => {
        if (userId && userId !== 'undefined') {
            fetch(`https://quiz-app-sigma-lilac.vercel.app/userExists/${userId}`)
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
                        {
                            userExists ? (
                                <>
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

                                    <li className="relative flex flex-col items-center">
                                        <a href="#" onClick={toggleLogout}>
                                            <img src="profile.png" alt="User" className="size-10 rounded-full"/>
                                        </a>
                                        {showLogout && (
                                            <div id="logout" className="absolute top-full mt-2 bg-slate-950 rounded-xl p-4 px-8 text-cyan-300 flex flex-col">
                                                <a href="" className="m-2">Dashboard</a>
                                                <a href="/" className="m-2">Logout</a>
                                            </div>
                                        )}
                                    </li>
                                </>
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
