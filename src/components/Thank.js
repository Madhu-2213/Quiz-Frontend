import React, { useEffect } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Replace history so quiz can't be revisited
    navigate('/thankyou', { replace: true });

    const handlePopState = () => {
      navigate('/thankyou', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  return (
    <Box
      sx={{
        position: 'fixed', // ✅ cover entire viewport
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2000, // ✅ above navbars
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0} // ✅ removed shadow
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 6,
            textAlign: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0', // subtle border instead of shadow
            animation: 'fadeIn 1s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(40px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 90,
              color: '#2e7d32',
              mb: 2,
              animation: 'pulse 1.8s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)', opacity: 1 },
                '50%': { transform: 'scale(1.15)', opacity: 0.75 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
          />

          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#1b5e20',
              fontSize: { xs: '1.8rem', sm: '2.3rem' },
              mb: 2,
            }}
          >
            ✅ Your responses have been saved!
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', sm: '1.2rem' },
            }}
          >
            You can now safely close this tab.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ThankYou;
