// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { useThemeStore } from '../store/product.js';

const Navbar = () => {
    const { isDarkMode, toggleDarkMode } = useThemeStore();

    return (
        <div className="bg-gray-400 dark:bg-gray-800 text-white p-4 rounded-lg flex justify-between items-center">
            <div className="text-blue-900 dark:text-blue-300 text-2xl font-bold">
                <Link to={'/'}><h1>PRODUCT STORE</h1></Link>
            </div>
            <div className="flex space-x-4">
                <button className="bg-blue-500 dark:bg-blue-700 px-4 py-2 rounded-lg text-white">
                    <Link to="/create"><FontAwesomeIcon icon={faPlus} /></Link>
                </button>
                <button
                    className="bg-blue-500 dark:bg-blue-700 px-4 py-2 rounded-lg text-white"
                    onClick={toggleDarkMode}
                >
                    {isDarkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
