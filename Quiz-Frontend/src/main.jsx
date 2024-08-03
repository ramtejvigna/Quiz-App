import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";
import Spinner from "./components/Spinner.jsx"; // Assuming you have a Spinner component for loading state

// Lazy loading components
const Home = lazy(() => import("./components/Home.jsx"));
const QuizPage = lazy(() => import("./components/QuizPage.jsx"));
const App = lazy(() => import("./App.jsx"));
const SignUp = lazy(() => import("./components/SignUp.jsx"));
const QuizQuestions = lazy(() => import("./components/QuizQuestions.jsx"));
const SignIn = lazy(() => import("./components/SignIn.jsx"));
const About = lazy(() => import("./components/About.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="highScore" element={<App />} />
        <Route path="quizzes/:categoryId" element={<QuizQuestions />} />
        <Route path=":userId">
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="highScore" element={<App />} />
          <Route path="quizzes/:categoryId" element={<QuizQuestions />} />
        </Route>
      </Route>
    </>
  )
);


function Layout() {
  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
