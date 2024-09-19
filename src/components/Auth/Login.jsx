import React, { useState } from "react";
import BerkutRes from "../../styles/photos/berkutreg.webp"; // Убедитесь, что путь к изображению правильный
import GoogleLogo from "../../styles/photos/Logo/googleLogo.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <section className="login-section">
      <div className="container">
        <div className="login-page">
          <div className="left-image">
            <img src={BerkutRes} alt="Бүркіт" />
          </div>
          <div className="right-form">
            <div className="login-card">
              <div className="login-header">
                <button className="login-tab active">Кіру</button>
                <button className="login-tab">Тіркелу</button>
              </div>
              <form onSubmit={handleSubmit}>
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
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Құпия сөзді енгізіңіз"
                  />
                </div>
                <div className="form-options">
                  <div className="remember-me">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Мені есте сақтаңыз</label>
                  </div>
                  <a href="#" className="forgot-password">
                    Құпия сөзді ұмыттыңыз ба?
                  </a>
                </div>
                <button type="submit" className="login-button-page">
                  Кіру
                </button>
              </form>
              <div className="login-alternatives">
                <button className="google-login">
                  <img src={GoogleLogo} />
                  Googleмен жалғастыру
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
