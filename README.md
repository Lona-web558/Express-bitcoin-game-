# Express-bitcoin-game-

# Express-math-game-2

🧮 Bitcoin Math Quiz

A full-stack math quiz game built with Node.js, Express.js, MongoDB, Bootstrap 5, EJS, and JavaScript. Players solve math questions, earn points, convert points into satoshis, and request Bitcoin withdrawals.

«Note: The current project is intended for learning and development. Before enabling real Bitcoin payouts, ensure all game logic and reward calculations are performed securely on the server.»

---

## Features

- User Registration
- User Login
- JWT Authentication (cookie-based)
- Password Encryption (bcrypt)
- Addition Quiz Game
- Countdown Timer
- Score Tracking
- Streak Bonuses
- Points -> Satoshi Conversion
- Wallet Management (address + type)
- Withdrawal Requests (with min/max limits)
- Withdrawal History
- Admin Dashboard (protected, admin-only)
- MongoDB Database

---

## Technologies

**Frontend**
- HTML5
- CSS3
- Bootstrap 5 (via CDN)
- EJS templating
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB Atlas
- Mongoose

**Authentication**
- JWT
- bcrypt

---

## Project Structure

Everything lives in one flat folder — no subdirectories — since this project is built and maintained entirely from a mobile phone.

```
bitcoin-math-quiz/
    server.js          entry point
    package.json
    .env                (create this yourself, see below)
    .env.example

    User.js             User model
    User2.js            Withdrawal model

    auth1.js            /register, /login routes
    routes.js           /play, /api/question, /api/answer, /dashboard routes
    wallet.js           /wallet, /withdraw, /history routes
    admin.js            /admin route
    middleware.js        auth + isAdmin middleware

    index.ejs
    login.ejs
    register.ejs
    dashboard.ejs
    play.ejs
    wallet.ejs
    history.ejs
    admin.ejs

    style.css
    quiz.js             client-side quiz logic
```

---

## Installation

Clone the repository.

```
git clone <repository-url>
cd bitcoin-math-quiz
```

Install dependencies.

```
npm install
```

---

## Required Packages

Already listed in `package.json`, installed automatically with `npm install`:

- express
- mongoose
- dotenv
- bcrypt
- jsonwebtoken
- cookie-parser
- express-validator
- ejs

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your own values:

```
PORT=3000

JWT_SECRET=ReplaceWithYourSecretKey

MONGODB_URI=your_mongodb_connection_string

MINIMUM_WITHDRAWAL=500
MAXIMUM_WITHDRAWAL=100000
```

---

## Start the Application

Development

```
npm run dev
```

Production

```
npm start
```

---

## Game Rules

- Solve addition questions before the 60-second timer runs out.
- Earn 10 points for each correct answer.
- Build a streak by answering correctly in a row.
- Every 100 points equals 1 satoshi (configurable via conversion logic in `routes.js`).

---

## Wallet

Players can:

- Save a Bitcoin address or Lightning wallet type
- View satoshi balance
- Request withdrawals (subject to min/max limits)
- View withdrawal history

---

## Admin Features

Accessible only to users with `isAdmin: true` in the database:

- View all users
- View all withdrawal requests
- View player statistics (points, satoshis, wallet)

---

## Security

- Password hashing with bcrypt
- JWT authentication via httpOnly cookie
- Protected routes (auth + isAdmin middleware)
- Server-side answer validation (answers are never trusted from the client)
- Withdrawal min/max limits
- Input validation on registration
- Static files are served explicitly (style.css, quiz.js only) — the whole project folder is never exposed publicly

---

## Future Improvements

- Lightning Network payouts
- BTCPay Server integration
- Email verification
- Password reset
- Two-factor authentication
- Progressive Web App (PWA)
- Push notifications
- Tournament mode
- Referral system
- Achievement badges
- Multiplayer mode
- Docker support
- Lives / XP system (UI placeholders already exist on the play screen)

---

## API Endpoints

**Authentication**
- GET/POST `/register`
- GET/POST `/login`

**Quiz**
- GET `/play`
- GET `/api/question`
- POST `/api/answer`
- GET `/dashboard`

**Wallet**
- GET `/wallet`
- POST `/wallet`
- POST `/withdraw`
- GET `/history`

**Admin**
- GET `/admin`

---

## License

This project is provided for educational purposes. If you plan to offer real Bitcoin rewards or withdrawals, review the legal, regulatory, tax, and financial requirements that apply in the countries where your service will operate.

---

## Author

Developed by Lona Matshingana using Node.js, Express.js, MongoDB, Bootstrap 5, HTML5, CSS3, and Javascript in the Republic of South Africa. 
