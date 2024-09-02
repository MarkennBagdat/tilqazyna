import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleStartTest = () => {
        navigate('/test');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="welcome-page">
    <img src={require('../styles/photos/berkut.png')} alt="Бүркіт" className="berkut-image" />
    <h1 className='welcomepage_h1'>Қош келдіңіздер!</h1>
    <p className='welcomepage_p'>Қазақ тілін бізбен бірге үйреніңіздер!</p>
    <button className="start-button" onClick={handleStartTest}>Тестті бастау</button>
    <button className="login-button" onClick={handleLogin}>Кіру</button>
</div>

    );
};

export default WelcomePage;
