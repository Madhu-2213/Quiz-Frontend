import React, { useEffect } from 'react';
import { Container, Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ThankYou from './components/Thank';

export default function Result({ score, results, questions, name }) {
  const navigate = useNavigate();

  // ✅ Redirect after 1 minute
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/thankyou');
    }, 10000); 
    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4">Quiz Complete!</Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
          {name}, your score is: {score} / 10
        </Typography>

        {results[0]?.completedAt && (
          <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
            Quiz completed at:{' '}
            {new Date(results[0].completedAt).toLocaleString('en-IN', {
              timeZone: 'Asia/Kolkata',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </Typography>
        )}

        {questions.map((question, index) => {
          const userAnswer = results.find(result => result.questionId === question._id);
          const isCorrect = userAnswer?.correct;

          return (
            <Card sx={{ mt: 3, backgroundColor: isCorrect ? 'success.main' : 'error.main' }} key={index}>
              <CardContent>
                <Typography variant="h6">{question.question}</Typography>
                <Box>
                  {question.options.map((opt, idx) => {
                    const isSelected = userAnswer?.selected === idx;
                    const isCorrectAnswer = idx === question.correctAnswer;

                    return (
                      <Typography
                        variant="body1"
                        sx={{
                          mt: 1,
                          backgroundColor:
                            isSelected
                              ? isCorrectAnswer
                                ? 'green'
                                : 'red'
                              : isCorrectAnswer
                                ? 'lightgreen'
                                : 'transparent',
                          color: isSelected && !isCorrectAnswer ? 'white' : 'black',
                          padding: '5px',
                          borderRadius: '4px',
                        }}
                        key={idx}
                      >
                        {opt}
                      </Typography>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          );
        })}

        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ mr: 2 }}>
            Home
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/quiz')}>
            Restart Quiz
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
