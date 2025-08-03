# Quiz App

This is a modern, interactive Quiz Application built with the MERN stack (MongoDB, Express, React, Node.js).

Users can enter their name, read instructions, take a 10-question quiz, and view detailed results with correct and incorrect answers highlighted.

## ✨ Features

### 🧑 User Flow & Interface
- **User Name Input** — Enter name before starting the quiz
- **Quiz Instructions Screen** — Clear guidance before starting
- **Randomized Questions** — 10 questions shuffled on every attempt
- **Multiple Choice UI** — Clickable options using Material UI
- **Responsive & Styled** — Clean, mobile-friendly UI with Material UI

---

### ⏱️ Quiz Functionality
- **2-Minute Timer** — Countdown from 2 minutes
- **Auto-Submit on Timeout** — Automatically submits when time ends
- **Answer Evaluation** — Calculates and displays final score
- **Color-Coded Results**
  - ✅ Correct: Green highlight
  - ❌ Wrong: Red highlight

---

### 📊 Data Tracking & Storage
- **Stores User Name & Score** in MongoDB
- **Stores Completed Time (IST)** in 12-hour format  
  _Example: July 2, 2025, 01:26 PM (IST)_
- **Tracks Duration Taken**
  - If finished early: `"1.26 minutes"`
  - If full time used: `"2 minutes"`

---

### 🔐 Extra Protections
- **Prevents Back Navigation** during the quiz


- Frontend: React, Material UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Others: React Router, useState/useEffect hooks

## Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/your-github-repo-link.git
cd your-github-repo-link

## Backend Setup
1. cd backend
2. npm install
3. npm start

## Frontend Setup
1. cd frontend
2. npm install
3. npm start

## ✍️ Author
- MADHAVI VALLABHANENI

## 📄 License
This project is publicly visible but is not open-source. Please do not reuse the code without permission.
