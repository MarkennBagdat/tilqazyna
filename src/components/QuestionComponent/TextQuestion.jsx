import React from "react";

const TextQuestion = ({
  question,
  options,
  correct_option,
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
              ${showResults && option === correct_option ? "correct" : ""} 
              ${showResults && option === selectedAnswer && option !== correct_option ? "incorrect" : ""}`}  
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
