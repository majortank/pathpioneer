import { redirect, useNavigate } from 'react-router-dom'; 
import React, { useState, useEffect } from "react";
import './app.css';
import SkillsMatrix from "./components/SkillsMatrix";
import Footer from "./components/Footer";
import RewardPunishment from "./components/RewardPunishment";

const API_BASE_URL = "https://www.pioneerapi.tangikuu.tech/question/all/";
// const API_BASE_URL = "http://localhost:8000/question/all/";


import logo from './images/logo.png';
import logo1 from './images/logo1.png';

import { useAuth } from './contexts/auth';

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [disabledOptions, setDisabledOptions] = useState({});
  const [selectedLevel, setSelectedLevel] = useState("Beginner");
  const { user, signOut } = useAuth();
    const navigate = useNavigate();
  useEffect(() => {
    if (!user){
        navigate('/login');
      }

  }, [user])
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchQuestions = (level) => {
    fetch(`${API_BASE_URL}${level}`)
      .then((response) => response.json())
      .then((data) => {
        const questionsWithShuffledOptions = data.map((question) => {
          const shuffledOptions = shuffleArray(question.options);
          return { ...question, options: shuffledOptions };
        });
        setQuestions(questionsWithShuffledOptions);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };
  

  useEffect(() => {
    fetchQuestions(selectedLevel);
  }, [selectedLevel]);

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleAnswerChange = (selectedAnswer) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: selectedAnswer });
    setDisabledOptions({ ...disabledOptions, [currentQuestionIndex]: true });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      const userAnswer = userAnswers[index];
      if (userAnswer === question.correct_answer) {
        score++;
      }
      return score;
    }, 0);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const score = calculateScore();

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  
  

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
        <div className="level-selector mt-5 w-full" style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexDirection:"column-reverse" }}>
          <div className=" ml-2">
            <label className="mr-3 ml-2 text-lg text-secondary">Select your level:</label>
            <select
              className="select select-secondary w-full max-w-xs"
              value={selectedLevel}
              onChange={handleLevelChange}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="radial-progress bg-secondary text-secondary-content text-lg border-4 border-secondary ml-2 mb-4" style={{ "--value": progress, "--size": "3rem" }}>
            {progress}%
          </div>
        </div>

        <div className="indicator mt-10 max-w-7xl">
          <div className="indicator-item indicator-bottom indicator-center">
            <button className="numerator btn btn-secondary w-10 text-3xl"><span className=" mx-2">{score}</span></button>
            <button className="denominator btn btn-secondary w-10 text-3xl"><span className=" mx-2">{questions.length}</span></button>
          </div>
          {userAnswers[currentQuestionIndex] && ( // Display RewardPunishment component only if an answer has been selected
        <RewardPunishment
          isCorrect={userAnswers[currentQuestionIndex] === currentQuestion.correct_answer}
        />
      )}
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <div className="card-body">
              <div className=" w-4/5">
                <div className="badge badge-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      {currentQuestion.level} Level Assesment
                  </div>
              </div>
              <div className="question-container">
                <h2 className=" text-4xl mb-2">{currentQuestion.question}</h2>
                <ul>
                  {currentQuestion.options.map((option, index) => (
                    <li key={index}>
                      <label className=" text-xl">
                        <input
                        className="mr-2 radio-secondary radio-xs"
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={option}
                          onChange={() => handleAnswerChange(option)}
                          checked={userAnswers[currentQuestionIndex] === option}
                          disabled={disabledOptions[currentQuestionIndex]}
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="button-container">
                  {currentQuestionIndex > 0 && (
                    <button className="transition ease-in-out delay-150 btn btn-sm mt-4 mr-2 btn-outline btn-secondary hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={handlePreviousQuestion}>Previous Question</button>
                  )}
                  {currentQuestionIndex < questions.length - 1 && (
                    <button className="transition ease-in-out delay-150 btn btn-sm mt-4 btn-outline btn-secondary hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={handleNextQuestion}>Next Question</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    
    </div>
    {/* {isLastQuestion && (
        <SkillsMatrix userAnswers={userAnswers} questions={questions} />
      )} */}
      <Footer />
    </>
    
  );
};

export default HomePage;
