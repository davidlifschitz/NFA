// frontend/src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import AdviceDisplay from './AdviceDisplay';

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAdvice('');
    try {
      const response = await axios.post('http://localhost:5000/get_advice', { user_input: userInput });
      setAdvice(response.data.advice);
    } catch (error) {
      console.error('Error fetching advice:', error);
      setError('Error fetching advice. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Welcome to the LLM-Powered Personal Finance Advisor</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your question or statement:
          <input type="text" value={userInput} onChange={handleInputChange} />
        </label>
        <button type="submit">Get Advice</button>
      </form>
      <AdviceDisplay advice={advice} error={error} />
    </div>
  );
};

export default App;
