import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Container,
  Paper,
  LinearProgress,
  Chip,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const fullScreenStyle = {
  position: 'fixed', // cover entire screen
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2000, // above navbar
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 10px',
};

const normalStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px 15px',
};

function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

const shuffledQuestions = shuffleArray([
  {
    question: "What is React?",
    options: [
      "A JavaScript library for building user interfaces",
      "A database management system",
      "A back-end framework",
      "A CSS preprocessor"
    ],
    correctAnswer: "A JavaScript library for building user interfaces"
  },
  {
    question: "Which of the following is used to manage state in React?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: "useState"
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JavaScript Extension",
      "JavaScript Expressions"
    ],
    correctAnswer: "JavaScript XML"
  },
  {
    question: "Which is the correct syntax to create a React component?",
    options: [
      "function MyComponent() {}",
      "const MyComponent = () => {}",
      "class MyComponent extends React.Component {}",
      "All of the above"
    ],
    correctAnswer: "All of the above"
  },
  {
    question: "What is the purpose of the `useEffect` hook?",
    options: [
      "To manage the component state",
      "To perform side effects in function components",
      "To handle form validation",
      "To manage lifecycle in class components"
    ],
    correctAnswer: "To perform side effects in function components"
  },
  {
    question: "Which is used to pass data from parent to child in React?",
    options: ["State", "Props", "useState", "useContext"],
    correctAnswer: "Props"
  },
  {
    question: "What is a virtual DOM in React?",
    options: [
      "A real DOM manipulated in React",
      "An in-memory representation of the actual DOM",
      "A lightweight library for DOM operations",
      "A lifecycle method"
    ],
    correctAnswer: "An in-memory representation of the actual DOM"
  },
  {
    question: "Which lifecycle method is called after a component is updated?",
    options: ["componentWillMount", "componentDidMount", "componentDidUpdate", "componentWillUnmount"],
    correctAnswer: "componentDidUpdate"
  },
  {
    question: "What does the `key` prop do in React lists?",
    options: [
      "It gives each element a unique identifier",
      "Determines rendering order",
      "Manages state",
      "Triggers re-renders"
    ],
    correctAnswer: "It gives each element a unique identifier"
  },
  {
    question: "What is the purpose of React Router?",
    options: [
      "To manage global state",
      "To handle client-side routing",
      "To manage form inputs",
      "To fetch data from APIs"
    ],
    correctAnswer: "To handle client-side routing"
  }
]);

const Quiz = ({ userName }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [endTime, setEndTime] = useState(null);
  const navigate = useNavigate();
  const [quizStartTime] = useState(Date.now());

  useEffect(() => {
    navigate('/quiz', { replace: true });
    const handlePopState = () => navigate('/quiz', { replace: true });
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResults(true);
          const completed = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
          const timeTaken = Math.round((Date.now() - quizStartTime) / 1000);
          setEndTime(completed);
          submitResults(userName, score, completed, timeTaken);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showResults) {
      const timer = setTimeout(() => {
        navigate('/thankyou');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showResults, navigate]);

  const handleAnswer = (selectedIndex) => {
    const selectedAnswer = shuffledQuestions[currentQuestion].options[selectedIndex];
    const isCorrect = selectedAnswer === shuffledQuestions[currentQuestion].correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);

    const updatedAnswers = [
      ...userAnswers,
      {
        question: shuffledQuestions[currentQuestion].question,
        selected: selectedAnswer,
        correct: shuffledQuestions[currentQuestion].correctAnswer,
      },
    ];
    setUserAnswers(updatedAnswers);

    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      const completed = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      const timeTaken = Math.round((Date.now() - quizStartTime) / 1000);
      setEndTime(completed);
      submitResults(userName, isCorrect ? score + 1 : score, completed, timeTaken);
    }
  };

  const submitResults = async (name, currentScore, completedAt, timeTakenInSeconds) => {
    try {
      await fetch('https://quiz-4-t3j4.onrender.com/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score: currentScore, completedAt, timeTakenInSeconds }),
      });
    } catch (err) {
      console.error("Error submitting results:", err);
    }
  };

  if (showResults) {
    // Results page -> shadow removed
    return (
      <Box sx={normalStyle}>
        <Container maxWidth="md">
          <Paper elevation={0} sx={{ p: 5, borderRadius: 5, textAlign: 'center', border: '1px solid #ddd' }}>
            <EmojiEventsIcon sx={{ fontSize: 70, color: '#fbc02d', mb: 2 }} />
            <Typography variant="h4" gutterBottom fontWeight={700} color="primary">
              🎉 Well Done, {userName}!
            </Typography>
            <Typography variant="h6" gutterBottom>
              You scored <strong>{score}</strong> / {shuffledQuestions.length}
            </Typography>
            <Stack spacing={2} mt={4}>
              {userAnswers.map((ans, index) => (
                <Card
                  key={index}
                  sx={{
                    m: 1,
                    backgroundColor: ans.selected === ans.correct ? '#e8f5e9' : '#ffebee',
                    borderLeft: `6px solid ${ans.selected === ans.correct ? '#2e7d32' : '#c62828'}`,
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'scale(1.02)' },
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {index + 1}. {ans.question}
                    </Typography>
                    <Typography
                      sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
                      color={ans.selected === ans.correct ? 'green' : 'red'}
                    >
                      {ans.selected === ans.correct ? <CheckCircleIcon /> : <CancelIcon />}
                      &nbsp;Your Answer: {ans.selected || 'Not Answered'}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                      Correct Answer: {ans.correct}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

  const current = shuffledQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;

  // Question page -> with border and no shadow
  return (
    <Box sx={fullScreenStyle}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            border: '1px solid #ddd',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" fontWeight={600} color="primary">
              Question {currentQuestion + 1}/{shuffledQuestions.length}
            </Typography>
            <Chip
              icon={<AccessTimeIcon />}
              label={`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}
              color={timeLeft < 30 ? 'error' : 'primary'}
              variant="outlined"
            />
          </Stack>

          <LinearProgress variant="determinate" value={progress} sx={{ mb: 3, height: 8, borderRadius: 5 }} />

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
            {current.question}
          </Typography>

          <Stack spacing={2}>
            {current.options.map((opt, idx) => (
              <Button
                key={idx}
                onClick={() => handleAnswer(idx)}
                variant="contained"
                fullWidth
                sx={{
                  py: 1.6,
                  fontSize: '16px',
                  fontWeight: 600,
                  borderRadius: 3,
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {opt}
              </Button>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Quiz;
