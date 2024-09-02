import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import TestPage from './components/TestPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/test" element={<TestPage />} />
                {/* Другие маршруты, такие как '/login' */}
            </Routes>
        </Router>
    );
};

export default App;
