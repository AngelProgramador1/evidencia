import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ProvidersPage from './pages/ProvidersPage';

function App() {
  const [theme, setTheme] = useState('light');
  // To avoid logging in every time during development, you can uncomment the line below.
  // const [isAuthenticated, setIsAuthenticated] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <div className="form-check form-switch m-3 position-absolute top-0 end-0">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="themeSwitcher"
            onClick={toggleTheme}
            />
          <label className="form-check-label" htmlFor="themeSwitcher">
             {theme === 'light' ? '🌙' : '☀️'}
          </label>
        </div>

        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/" 
            element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/providers" 
            element={isAuthenticated ? <ProvidersPage /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
