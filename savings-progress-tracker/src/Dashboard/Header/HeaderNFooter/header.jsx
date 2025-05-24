import React, { useState } from 'react';
import "./header.css";


function Header() {

    const [showtheme, setShowTheme] = useState(false);

    const toggletheme = () => {
    setShowTheme(prev => !prev);
    };
   
    return (
        <div className="header">
            <span className="buton-wrap">
                <button className="goal-button">Goals</button>



                <button className="goal-button" onClick={toggletheme}>Theme</button>
                {showtheme && (
                    <div className='theme-overlay'>
                        <div>
                        <button className='color-dark-blue color'></button>
                        <button className='color-dark-red color'></button>
                        <button className='color-dark-yellow color'></button>
                        </div>
                        <div>
                        <button className='color-light-blue color'></button>
                        <button className='color-light-red color'></button>
                        <button className='color-light-yellow color'></button>
                        </div>
                    </div>
                )}


            </span>
            <header>
                <h1 className="goal">Gaming PC</h1>
            </header>
            
        </div>
    );
};

export default Header;