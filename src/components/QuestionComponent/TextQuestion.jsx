import React from "react";

const TextQuestion = ({
  question,
  options,
  correctOption,
  selectedAnswer,
  showResults,
  onAnswerSelect,
  onCheckAnswer,
  onNextQuestion,
}) => {
  return (
    <div className="question-container">
      <h2 className="question-text">{question}</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button 
              ${selectedAnswer === option ? "selected" : ""} 
              ${showResults && option === correctOption ? "correct" : ""} 
              ${showResults && option === selectedAnswer && option !== correctOption ? "incorrect" : ""}`}  
            onClick={() => onAnswerSelect(option)}
            disabled={showResults} // Disable buttons after checking the answer
          >
            {option}
          </button>
        ))}
      </div>
      {!showResults ? (
        <button
          className="check-button"
          onClick={onCheckAnswer}
          disabled={!selectedAnswer}
        >
          Тексеру
        </button>
      ) : (
        <button className="next-button" onClick={onNextQuestion}>
          Келесі
        </button>
      )}
    </div>
  );
};

export default TextQuestion;
