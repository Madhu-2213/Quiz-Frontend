// src/components/Instruction.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  Stack,
} from '@mui/material';
import RuleIcon from '@mui/icons-material/Rule';
import QuizIcon from '@mui/icons-material/Quiz';

export default function Instructions({ userName }) {
  const navigate = useNavigate();

  // ✅ Back navigation lock
  useEffect(() => {
    navigate('/instructions', { replace: true });

    const handlePopState = () => {
      navigate('/instructions', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#f9fafb',
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: { xs: 4, sm: 6 },
          borderRadius: 5,
          width: '100%',
          maxWidth: 600,
          textAlign: 'center',
          boxShadow: '0px 8px 30px rgba(0,0,0,0.12)',
        }}
      >
        {/* Header Section */}
        <Stack spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <QuizIcon
            sx={{
              fontSize: 60,
              color: '#1976d2',
              boxShadow: '0 6px 20px rgba(25,118,210,0.3)',
              borderRadius: '50%',
              p: 1,
            }}
          />
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: '#1e3a8a' }}
          >
            Hi {userName}, Read the Instructions
          </Typography>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        {/* Instructions List */}
        <Stack spacing={2} sx={{ mb: 4, textAlign: 'left' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <RuleIcon color="primary" />
            <Typography variant="body1" fontSize="17px">
              📝 Total: <strong>10 questions</strong>
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <RuleIcon color="success" />
            <Typography variant="body1" fontSize="17px">
              ✔ <strong>1 point</strong> for each correct answer
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <RuleIcon color="error" />
            <Typography variant="body1" fontSize="17px">
              ❌ No negative marking
            </Typography>
          </Stack>
        </Stack>

        {/* Start Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            py: 1.6,
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
          onClick={() => navigate('/quiz')}
        >
          🚀 Begin Quiz
        </Button>
      </Paper>
    </Box>
  );
}
