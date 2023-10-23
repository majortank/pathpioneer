import React, { useState, useEffect } from "react";
import './app.css';
import SkillsMatrix from "./components/SkillsMatrix";
import Footer from "./components/Footer";
import RewardPunishment from "./components/RewardPunishment";

// const API_BASE_URL = "http://10.82.1.228:8000/question/all/";
const API_BASE_URL = "http://localhost:8000/question/all/";
// import logo from "images/logo.png";

import logo from './images/logo.png';
import logo1 from './images/logo1.png';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [disabledOptions, setDisabledOptions] = useState({});
  const [selectedLevel, setSelectedLevel] = useState("Beginner");


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
        <div className="navbar bg-white">
          <div className="flex-1">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar ml-5 inline-block">
              <div className=" w-12  rounded-full">
                <img src={logo1} />
              </div>
              
            </label>
            <a className="btn btn-ghost normal-case text-xl"><span className=" text-indigo-500 text-2xl logo">Path</span><span className=" text-fuchsia-500 text-2xl logo">Pioneer</span></a>
          </div>
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center">
        <div className="level-selector mt-5 w-full" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <label className="mr-3 text-lg">Select your level:</label>
            <select
              className="select select-primary w-full max-w-xs"
              value={selectedLevel}
              onChange={handleLevelChange}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="radial-progress bg-primary text-primary-content text-2xl border-4 border-primary" style={{ "--value": progress, "--size": "3rem" }}>
            {progress}%
          </div>
        </div>



      {/* ... rest of the code */}

        <div className="indicator mt-10 max-w-7xl">
          <div className="indicator-item indicator-bottom indicator-center">
            <button className="btn btn-primary text-3xl">{score}</button>
          </div>
          {userAnswers[currentQuestionIndex] && ( // Display RewardPunishment component only if an answer has been selected
        <RewardPunishment
          isCorrect={userAnswers[currentQuestionIndex] === currentQuestion.correct_answer}
        />
      )}
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <div className="card-body">
              <div className=" w-4/5">
                <div className="badge badge-primary">
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
                        className="mr-2 radio-primary radio-xs"
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
                    <button className="transition ease-in-out delay-150 btn btn-sm mt-4 mr-2 btn-outline btn-primary hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={handlePreviousQuestion}>Previous Question</button>
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

export default App;
