// QuestionForm.js
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const createQuiz = () => {
  const [question, setQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correct_answer: '',
    level: '',
    industry: '',
    focus_area: '',
    topic: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://www.pioneerapi.tangikuu.tech/question/create/',
        [question],
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(response.data.message, {
        icon: '😕',
      });
    } catch (error) {
      
      toast.success(error.response.data.detail, {
        icon: '😕',
      });
    }
  };

  const handleInputChange = (index, value) => {
    setQuestion({
      ...question,
      options: question.options.map((option, i) =>
        i === index ? value : option
      ),
    });
  };

  const handleOtherInputChange = (field, value) => {
    setQuestion({
      ...question,
      [field]: value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        {/* Question input */}
        <label>Question:</label>
        <input
          type="text"
          value={question.question}
          onChange={(e) => handleOtherInputChange('question', e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        {/* Options inputs */}
        {question.options.map((option, index) => (
          <div key={index} className="mb-4">
            <label>{`Option ${index + 1}:`}</label>
            <input
              type="text"
              value={option}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        ))}

        {/* Correct answer input */}
        <label>Correct Answer:</label>
        <input
          type="text"
          value={question.correct_answer}
          onChange={(e) => handleOtherInputChange('correct_answer', e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        {/* Level input */}
        <label>Level:</label>
        <input
          type="text"
          value={question.level}
          onChange={(e) => handleOtherInputChange('level', e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        {/* Industry input */}
        <label>Industry:</label>
        <input
          type="text"
          value={question.industry}
          onChange={(e) => handleOtherInputChange('industry', e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        {/* Focus Area input */}
        <label>Focus Area:</label>
        <input
          type="text"
          value={question.focus_area}
          onChange={(e) => handleOtherInputChange('focus_area', e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        {/* Topic input */}
        <label>Topic:</label>
        <input
          type="text"
          value={question.topic}
          onChange={(e) => handleOtherInputChange('topic', e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Question
        </button>
      </form>
    </div>
  );
};

export default createQuiz;
