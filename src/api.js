import axios from 'axios';

export const submitQuiz = async (quizData) => {
  try {
    const response = await axios.post('https://quiz-8cb6.onrender.com/api/quiz/submit', quizData);
    return response.data;
  } catch (error) {
    console.error('Error submitting quiz:', error);
    throw error;
  }
};
