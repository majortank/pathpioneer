import React from "react";

const SkillsMatrix = ({ userAnswers, questions }) => {
  const calculateSkills = () => {
    const skills = {};

    // Iterate through user answers and update corresponding skills based on topic and focus area
    for (const [questionIndex, userAnswer] of Object.entries(userAnswers)) {
      const question = questions[questionIndex];
      const { topic, focus_area } = question;

      // Initialize skills for the topic if not already initialized
      if (!skills[topic]) {
        skills[topic] = {};
      }

      // Initialize skills for the focus area if not already initialized
      if (!skills[topic][focus_area]) {
        skills[topic][focus_area] = 0;
      }

      // Increment skill value for the corresponding topic and focus area
      if (userAnswer === question.correct_answer) {
        skills[topic][focus_area]++;
      }
    }

    return skills;
  };

  const skills = calculateSkills();

  return (
    <div className="skills-matrix">
      <h2>Skills Matrix</h2>
      {Object.keys(skills).map((topic) => (
        <div key={topic}>
          <h3>{topic}</h3>
          {Object.keys(skills[topic]).map((focusArea) => (
            <div key={focusArea} className="progress-container">
              <label>{focusArea}</label>
              <progress
                className={`progress ${skills[topic][focusArea] > 1 ? "progress-success" : "progress-error"}`}
                value={skills[topic][focusArea]}
                max="100"
              ></progress>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkillsMatrix;
