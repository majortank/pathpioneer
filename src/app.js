import React, { useState, useEffect } from "react";
import './app.css';
import SkillsMatrix from "./components/SkillsMatrix";

const API_BASE_URL = "http://localhost:8000/question/all/";

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
      .then((data) => setQuestions(data))
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


  return (
    <>
      <div className="flex flex-col items-center">
        <div className="navbar bg-indigo-400">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl text-indigo-50">PathPioneer</a>
          </div>
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center">
      <div className="level-selector mt-5">
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

      {/* ... rest of the code */}

        <div className="indicator mt-10">
          <div className="indicator-item indicator-bottom">
            <button className="btn btn-primary animate-bounce">Current Score: {score}</button>
          </div> 
          <div className="card border">
            <div className="card-body">
            <h2>
              <div className="badge badge-info gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  {currentQuestion.level} Level Assesment
              </div>
            </h2>
            
              <div className="question-container">
                <h2 className=" text-4xl mb-2">{currentQuestion.question}</h2>
                <ul>
                  {currentQuestion.options.map((option, index) => (
                    <li key={index}>
                      <label className=" text-xl">
                        <input
                        className=" mr-2 radio-primary radio-xs"
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
                    <button className="transition ease-in-out delay-150 btn btn-sm mt-4 mr-2 btn-outline btn-accent hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={handlePreviousQuestion}>Previous Question</button>
                  )}
                  {currentQuestionIndex < questions.length - 1 && (
                    <button className="transition ease-in-out delay-150 btn btn-sm mt-4 btn-outline btn-primary hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={handleNextQuestion}>Next Question</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
    {isLastQuestion && (
        <SkillsMatrix userAnswers={userAnswers} questions={questions} />
      )}
    </>
    
  );
};

export default App;
