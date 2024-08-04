# Quiz App

This is a full-stack quiz application built using React for the frontend and Express with MongoDB for the backend. The application allows users to sign up, sign in, take quizzes from various categories, and view high scores.

## Features

- User authentication (Sign up and Sign in)
- Fetch quiz questions from Open Trivia Database API
- Display quiz questions and accept answers
- Submit quiz answers and calculate scores
- Save scores to the database
- Display high scores - So that users can know their positions in the leaderboard

## Technologies Used

### Frontend

- React
- React Router
- CSS (Tailwind and custom styles)

### Backend

- Node.js
- Express
- MongoDB (Mongoose for ORM)

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/ramtejvigna/Quiz-App.git
cd Quiz-App
```

2. **Install Dependencies**

```bash
cd frontend
npm install
```
```bash
cd backend
npm install
```

3. Start the application

```bash
cd backend
nodemon app.js // or npm start
```
```bash
cd frontend
npm run dev
```

## API Endpoints

1. **User Routes**
   - `POST /signup` - Sign up a new user
   - `POST /signin` - Sign in an existing user
   - `GET /userExists/:userId` - Check if a user exists
3. **Score Routes**
   - `POST /saveScores` - Save a user's quiz score
   - `GET /highscores` - Get the scores of users and displays them

### Usage
1. **Sign Up / Sign In**
   - Users can sign up for a new account or sign in to an existing account.
2. **Take Quiz**
   - After signing in, users can select a quiz category and start answering questions.
3. **Submit Quiz**
   - Once the quiz is submitted, the score is calculated and saved to the database.
4. **View High Scores**
   - Users can view the high scores of all users, sorted in descending order.
  
## Contributing
Feel free to open issues or submit pull requests for any improvements or bugs you find.
