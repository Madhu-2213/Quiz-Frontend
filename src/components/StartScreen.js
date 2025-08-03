// src/components/StartScreen.js
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Stack,
  Fade,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';

const StartScreen = ({ onStart }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      onStart(name);
      navigate('/instructions');
    } else {
      alert('Please enter your name to start the quiz.');
    }
  };

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          height: '100vh',          // locks to viewport height
          width: '100vw',           // locks to viewport width
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          overflow: 'hidden',       // ensures no scrollbars
          position: 'fixed',        // fixes the component to viewport
          top: 0,
          left: 0,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 5,
            width: '100%',
            maxWidth: 500,
            textAlign: 'center',
            boxShadow: '0px 8px 30px rgba(0,0,0,0.12)',
          }}
        >
          <Stack spacing={4} alignItems="center">
            {/* Circular Icon with glow */}
            <Avatar
              sx={{
                bgcolor: '#1976d2',
                width: 90,
                height: 90,
                boxShadow: '0 6px 20px rgba(25,118,210,0.4)',
              }}
            >
              <QuizIcon sx={{ fontSize: 45 }} />
            </Avatar>

            {/* Title Section */}
            <Box>
              <Typography
                variant="h3"
                fontWeight={700}
                sx={{
                  color: '#1e3a8a',
                  mb: 1,
                  fontSize: { xs: '1.9rem', sm: '2.2rem' },
                }}
              >
                Ready for the Quiz?
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'text.secondary',
                  maxWidth: 360,
                  mx: 'auto',
                }}
              >
                Test your knowledge and see how well you score.  
                Enter your name below to get started!
              </Typography>
            </Box>

            <Divider sx={{ width: '100%' }} />

            {/* Input Field */}
            <TextField
              label="Your Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0px 4px 12px rgba(25,118,210,0.1)',
                  },
                },
              }}
            />

            {/* Start Button */}
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 1.8,
                fontSize: '17px',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                background:
                  'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                boxShadow: '0 5px 15px rgba(25,118,210,0.3)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)',
                  boxShadow: '0 8px 20px rgba(25,118,210,0.4)',
                },
              }}
              onClick={handleStart}
            >
              🚀 Start Quiz
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Fade>
  );
};

export default StartScreen;
