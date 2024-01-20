// QuestionForm.js
import React, { useState } from 'react';
import axios from 'axios';
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

//   const handleInputChange = (index, value) => {
//     setQuestion({
//       ...question,
//       options: question.options.map((option, i) =>
//         i === index ? value : option
//       ),
//     });
//   };

  const cityOptions = ["Madrid", "Barcelona", "Seville", "Valencia"];

  const handleOtherInputChange = (field, value) => {
    setQuestion({
      ...question,
      [field]: value,
    });
  };

  return (
        <div className="container mx-auto p-4"> 
          <form onSubmit={handleSubmit} className='flex flex-col w-full lg:flex-row'>
            <div className='grid md:grid flex-grow h-full w-full card bg-indigo-50 rounded-box place-items-center overflow-y-auto'>
                {/* Question input */}
                <label className="form-control w-full max-w-lg m-0">
                    <div htmlFor="Question" className="label">
                        <span className="label-text">Question Text?</span>
                    </div>
                    <textarea 
                    placeholder="What is the capital of Spain?" 
                    onChange={(e) => handleQuestionChange('question', e.target.value)}
                    className="textarea textarea-secondary textarea-lg w-full max-w-lg"
                    value={question.question}
                    required
                    />
                    </label>

                {/* Options inputs */}
                {question.options.map((option, index) => (
                    <label key={index} className="form-control w-full max-w-lg">
                        <div htmlFor="Question" className="label">
                            <span className="label-text">{`Option # ${index + 1}:`}</span>
                        </div>
                        <textarea 
                            type="text"
                            value={option} 
                            placeholder={`${cityOptions[index]}`} 
                            onChange={(e) => handleQuestionChange(index, e.target.value)}
                            className="textarea textarea-info textarea-lg w-full max-w-lg"
                            required
                        />
                    </label>
                ))}
                
                
            </div>
            <div className="divider lg:divider-horizontal">More</div> 
            <div className="grid md:grid flex-grow h-full w-full card bg-indigo-100 rounded-box place-items-center overflow-y-auto">
                {/* Correct answer input */}
                <label className="form-control w-full max-w-lg">
                <div htmlFor="CorrectAnswer" className="label">
                    <span className="label-text">Correct Answer:</span>
                </div>
                <textarea 
                    id="CorrectAnswer" 
                    type="text"
                    value={question.correct_answer} 
                    placeholder="Madrid" 
                    onChange={(e) => handleQuestionChange('correct_answer', e.target.value)}
                    className="textarea textarea-accent textarea-lg w-full max-w-lg"
                    required
                    />
                </label>

                {/* Level input */}
                <label className="form-control w-full max-w-lg">
                <div htmlFor="Level" className="label">
                    <span className="label-text">Level:</span>
                </div>
                <input 
                    id="Level" 
                    type="text"
                    value={question.level} 
                    placeholder="Beginner" 
                    onChange={(e) => handleQuestionChange('level', e.target.value)}
                    className="input input-bordered input-primary w-full max-w-lg"
                    required
                    />
                </label>
                    {/* Industry Input */}
                <label className="form-control w-full max-w-lg">
                    <div htmlFor="Industry" className="label">
                        <span className="label-text">Industry:</span>
                    </div>
                    <input 
                        id="Industry" 
                        type="text"
                        value={question.level} 
                        placeholder="Geography" 
                        onChange={(e) => handleQuestionChange('industry', e.target.value)}
                        className="input input-bordered input-primary w-full max-w-lg"
                        required
                        />
                </label>
                    {/* Focus Area Input */}
                <label className="form-control w-full max-w-lg">
                    <div htmlFor="FocusArea" className="label">
                        <span className="label-text">Focus Area:</span>
                    </div>
                    <input 
                        id="FocusArea" 
                        type="text"
                        value={question.focus_area} 
                        placeholder="European Capitals" 
                        onChange={(e) => handleQuestionChange('focus_area', e.target.value)}
                        className="input input-bordered input-primary w-full max-w-lg"
                        required
                        />
                </label>
                    {/* Topic Input */}
                <label className="form-control w-full max-w-lg">
                    <div htmlFor="Level" className="label">
                        <span className="label-text">Topic:</span>
                    </div>
                    <input 
                        id="Level" 
                        type="text"
                        value={question.topic} 
                        placeholder="World Geography" 
                        onChange={(e) => handleQuestionChange('topic', e.target.value)}
                        className="input input-bordered input-primary w-full max-w-lg"
                        required
                        />
                </label>
                <div className='flex-2 min-w-0 flex-grow-0 flex-shrink-0 max-w-200px'>
                 {/* Submit button */}
                <button 
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-2">
                        Submit Question
                </button>
            </div>
            </div>
            
           
          </form>
          
        </div>
      );
    };

export default createQuiz;
