import React, { useState, useEffect } from "react";
import TextQuestion from "./QuestionComponent/TextQuestion";
import ResultPage from "./ResultPage";
import { fetchTestData } from "../services/api";

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [responseTimes, setResponseTimes] = useState([]); // Сохраняем время ответов
  const [startTime, setStartTime] = useState(null); // Начальное время для каждого вопроса
  const [difficultyLevel, setDifficultyLevel] = useState(1); // Уровень сложности

  useEffect(() => {
    const loadTestData = async () => {
      try {
        const data = await fetchTestData();
        const formattedData = data.map((question) => ({
          ...question,
          options: [
            question.options1,
            question.options2,
            question.options3,
            question.options4,
            question.options5,
          ],
        }));
        setQuestions(formattedData);
        setStartTime(Date.now()); // Устанавливаем время начала первого вопроса
      } catch (error) {
        console.error("Failed to load test data:", error);
      }
    };

    loadTestData();
  }, []);

  if (questions.length === 0) {
    return (
      <div className="loading-container">
        <img
          src={require("../styles/photos/berkut.png")}
          alt="Бүркіт"
          className="loading-image"
        />
        <p className="loading-text">Сәл күте тұраңыз...</p>
      </div>
    );
  }

  const calculateDifficultyLevel = (currentIndex) => {
    if (currentIndex === 1 || currentIndex === 2) {
      return 1;
    }

    if (currentIndex >= 3 && currentIndex <= 5) {
      const avgTime = responseTimes.slice(0, 2).reduce((a, b) => a + b, 0) / 2;
      if (avgTime <= 5) return 3;
      if (avgTime <= 10) return 2;
      return 1;
    }

    if (currentIndex >= 6 && currentIndex <= 8) {
      const avgTime = responseTimes.slice(2, 5).reduce((a, b) => a + b, 0) / 3;
      if (avgTime <= 3) return 5;
      if (avgTime <= 5) return 4;
      if (avgTime <= 7) return 3;
      if (avgTime <= 10) return 2;
      return 1;
    }

    if (currentIndex === 9 || currentIndex === 10) {
      if (correctAnswers >= 7) return 5;
      if (correctAnswers >= 6) return 4;
      if (correctAnswers >= 5) return 3;
      if (correctAnswers >= 4) return 2;
      return 1;
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    const currentTime = Date.now();
    const timeSpent = (currentTime - startTime) / 1000; // Время в секундах
    setResponseTimes([...responseTimes, timeSpent]);

    if (
      selectedAnswer &&
      selectedAnswer.trim().toLowerCase() ===
        questions[currentQuestionIndex].correct_option.trim().toLowerCase()
    ) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setShowResults(true);
  };

  const handleNextQuestion = () => {
    setShowResults(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setDifficultyLevel(calculateDifficultyLevel(nextIndex)); // Рассчитать новый уровень сложности
      setStartTime(Date.now()); // Обновить начальное время для следующего вопроса
    } else {
      setShowResults("final");
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setResponseTimes([]);
    setDifficultyLevel(1);
    setShowResults(false);
    setSelectedAnswer(null);
    setStartTime(Date.now());
  };

  if (showResults === "final") {
    return (
      <ResultPage
        correctAnswers={correctAnswers}
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    );
  }

  const currentData = questions[currentQuestionIndex];

  return (
    <div className="test-page">
      <div className="text-section">
        <p>{currentData.text}</p>
      </div>
      <TextQuestion
        question={currentData.question}
        options={currentData.options}
        correct_option={currentData.correct_option}
        selectedAnswer={selectedAnswer}
        showResults={showResults}
        onAnswerSelect={handleAnswerSelect}
        onCheckAnswer={handleCheckAnswer}
        onNextQuestion={handleNextQuestion}
      />
    </div>
  );
};

export default TestPage;
