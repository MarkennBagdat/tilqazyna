import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import TestPage from './components/TestPage';
import Login from './components/Auth/Login';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path='/login' element={<Login />}/>
                
            </Routes>
        </Router>
    );
};

export default App;
