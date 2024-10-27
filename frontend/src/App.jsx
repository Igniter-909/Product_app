// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Createpage from './components/Createpage';
import Homepage from './components/Homepage';
import { useThemeStore } from './store/product.js';

function App() {
    const { isDarkMode, setDarkMode } = useThemeStore();

    useEffect(() => {
        // Load dark mode preference from localStorage
        const savedTheme = localStorage.getItem('theme');
        setDarkMode(savedTheme === 'dark');
    }, [setDarkMode]);

    useEffect(() => {
        // Save theme to localStorage and apply `dark` class to <html> element
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/create" element={<Createpage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
