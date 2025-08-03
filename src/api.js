import axios from 'axios';

export const submitQuiz = async (quizData) => {
  try {
    const response = await axios.post('https://quiz-4-t3j4.onrender.com/api/quiz/submit', quizData);
    return response.data;
  } catch (error) {
    console.error('Error submitting quiz:', error);
    throw error;
  }
};
