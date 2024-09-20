import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import TestPage from './components/TestPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Registsr';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path='/login' element={<Login />}/>
                <Route path='/registr' element={<Register />}/>
            </Routes>
        </Router>
    );
};

export default App;
