import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import BerkutRes from "../../styles/photos/berkutreg.webp"; 
import GoogleLogo from "../../styles/photos/Logo/googleLogo.png";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(""); // Для проверки надежности пароля
  const navigate = useNavigate(); // Инициализируем useNavigate

  const validateEmail = (email) => {
    // Регулярное выражение для проверки email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Проверяем длину пароля и наличие хотя бы одной цифры
    return password.length >= 8 && /\d/.test(password);
  };

  const validateName = (name) => {
    // Проверяем, чтобы имя и фамилия содержали только буквы
    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
    return nameRegex.test(name);
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 8) {
      return "Слабый";
    }
    if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/\d/)) {
      if (password.match(/[!@#$%^&*]/)) {
        return "Сильный";
      }
      return "Средний";
    }
    return "Слабый";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка имени
    if (!validateName(firstName)) {
      alert("Атыңыз тек әріптерден тұруы керек!");
      return;
    }

    // Проверка фамилии
    if (!validateName(lastName)) {
      alert("Тегіңіз тек әріптерден тұруы керек!");
      return;
    }

    // Проверка электронной почты
    if (!validateEmail(email)) {
      alert("Электрондық поштаның форматы дұрыс емес!");
      return;
    }

    // Проверка пароля
    if (passwordStrength === "Слабый") {
      alert("Құпия сөз өте әлсіз!");
      return;
    }

    // Проверка подтверждения пароля
    if (password !== confirmPassword) {
      alert("Құпия сөздер сәйкес келмейді!");
      return;
    }

    console.log("Имя:", firstName, "Фамилия:", lastName, "Email:", email, "Password:", password);
  };

  return (
    <section className="register-section">
      <div className="container">
        <div className="register-page">
          <div className="left-image">
            <img src={BerkutRes} alt="Бүркіт" />
          </div>
          <div className="right-form">
            <div className="register-card">
              <div className="register-header">
                <button className="register-tab" onClick={() => navigate('/login')}>Кіру</button>
                <button className="register-tab active">Тіркелу</button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">Аты</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Атыңызды енгізіңіз"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Тегі</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Тегіңізді енгізіңіз"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Электрондық поштаңызды енгізіңіз"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Құпия сөз</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Құпия сөзді енгізіңіз"
                  />
                  <p>Құпия сөздің күші: <strong>{passwordStrength}</strong></p> {/* Показываем силу пароля */}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Құпия сөзді растаңыз</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Құпия сөзді растаңыз"
                  />
                </div>
                <button type="submit" className="register-button-page">
                  Тіркелу
                </button>
              </form>
              <div className="login-alternatives">
                <button className="google-login">
                  <img src={GoogleLogo} alt="Google" />
                  Google арқылы жалғастыру
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
