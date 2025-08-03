// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import Instructions from './components/Instructions';
import Quiz from './components/Quiz';
import ThankYou from './components/Thank'; 

function App() {
  const [userName, setUserName] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen onStart={(name) => setUserName(name)} />} />
        <Route
          path="/instructions"
          element={
            userName ? <Instructions userName={userName} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/quiz"
          element={
            userName ? <Quiz userName={userName} /> : <Navigate to="/" />
          }
        />
        <Route path="/thankyou" element={<ThankYou />} /> 
      </Routes>
    </Router>
  );
}

export default App;
