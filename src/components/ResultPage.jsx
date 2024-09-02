import React from "react";

const ResultPage = ({ correctAnswers, totalQuestions, onRestart }) => {
  return (
    <div className="result-page">
      <h2>Сіздің нәтижелеріңіз:</h2>
      <p>
        Дұрыс жауаптар: {correctAnswers} / {totalQuestions}
      </p>
      <p>
        Қате жауаптар: {totalQuestions - correctAnswers} / {totalQuestions}
      </p>
      <button className="restart-button" onClick={onRestart}>
        Қайта бастау
      </button>
    </div>
  );
};

export default ResultPage;
