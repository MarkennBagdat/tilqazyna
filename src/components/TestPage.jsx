import React, { useState, useEffect } from "react";
import TextQuestion from "./QuestionComponent/TextQuestion";
import ResultPage from "./ResultPage";
import { fetchTestData } from "../services/api";

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState(3); // Начальный уровень сложности

  useEffect(() => {
    const loadTestData = async () => {
      try {
        const data = await fetchTestData(); // Получение данных с API
        // Предполагается, что каждый вопрос имеет поле `difficulty` от 1 до 5
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
      } catch (error) {
        console.error("Не удалось загрузить данные теста:", error);
      }
    };

    loadTestData();
  }, []);

  useEffect(() => {
    // Фильтрация вопросов по текущему уровню сложности
    const filtered = questions.filter(
      (question) => question.difficulty === difficultyLevel
    );
    setFilteredQuestions(filtered);
    setCurrentQuestionIndex(0);
  }, [questions, difficultyLevel]);

  useEffect(() => {
    // Сохранение уровня сложности в локальном хранилище
    localStorage.setItem("difficultyLevel", difficultyLevel);
  }, [difficultyLevel]);

  useEffect(() => {
    // Загрузка уровня сложности из локального хранилища при инициализации
    const storedDifficulty = localStorage.getItem("difficultyLevel");
    if (storedDifficulty) {
      setDifficultyLevel(parseInt(storedDifficulty, 10));
    }
  }, []);

  if (filteredQuestions.length === 0) {
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

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // Время в секундах

    if (
      selectedAnswer &&
      selectedAnswer.trim().toLowerCase() ===
        filteredQuestions[currentQuestionIndex].correctOption
          .trim()
          .toLowerCase()
    ) {
      setCorrectAnswers(correctAnswers + 1);
    }

    // Определение уровня сложности следующего вопроса
    let newDifficultyLevel = difficultyLevel;

    if (timeTaken < 5) {
      newDifficultyLevel = 5;
    } else if (timeTaken >= 5 && timeTaken < 10) {
      newDifficultyLevel = 4;
    } else if (timeTaken >= 10 && timeTaken < 15) {
      newDifficultyLevel = 3;
    } else if (timeTaken >= 15 && timeTaken < 20) {
      newDifficultyLevel = 2;
    } else {
      newDifficultyLevel = 1;
    }

    setDifficultyLevel(newDifficultyLevel); // Сохранить новый уровень сложности
    setShowResults(true);
  };

  const handleNextQuestion = () => {
    setShowResults(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setStartTime(Date.now()); // Установить время начала для следующего вопроса
    } else {
      // Показать результаты после последнего вопроса
      setShowResults("final");
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setDifficultyLevel(3); // Сброс уровня сложности до начального
    setStartTime(Date.now());
  };

  useEffect(() => {
    // Установить время начала при загрузке первого вопроса
    if (filteredQuestions.length > 0 && currentQuestionIndex === 0) {
      setStartTime(Date.now());
    }
  }, [filteredQuestions, currentQuestionIndex]);

  if (showResults === "final") {
    return (
      <ResultPage
        correctAnswers={correctAnswers}
        totalQuestions={filteredQuestions.length}
        onRestart={handleRestart}
      />
    );
  }

  const currentData = filteredQuestions[currentQuestionIndex];

  return (
    <div className="test-page">
      <div className="text-section">
        <p>{currentData.text}</p>
      </div>
      <TextQuestion
        question={currentData.question}
        options={currentData.options}
        correctOption={currentData.correctOption}
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
