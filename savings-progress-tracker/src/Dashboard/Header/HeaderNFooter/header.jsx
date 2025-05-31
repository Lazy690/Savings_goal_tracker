import React, { useState } from 'react';
import { useTheme } from '../../../ThemeContext'; // Import the useTheme hook
import './header.css';

function Header() {
  const [showtheme, setShowTheme] = useState(false);
  const { toggleTheme } = useTheme(); // Access the toggleTheme function

  const toggletheme = () => {
    setShowTheme((prev) => !prev);
  };

  return (
    <div className="header">
      <span className="buton-wrap">
        <button className="goal-button">Goals</button>

        <button className="goal-button" onClick={toggletheme}>
          Theme
        </button>
        {showtheme && (
          <div className="theme-overlay">
            <div>
              <button
                className="color-dark-blue color"
                onClick={() => toggleTheme('dark')}
              ></button>
            </div>
            <div>
              <button
                className="color-light-blue color"
                onClick={() => toggleTheme('light')}
              ></button>
            </div>
          </div>
        )}
      </span>
      <header>
        <h1 className="goal">Gaming PC</h1>
      </header>
    </div>
  );
}

export default Header;