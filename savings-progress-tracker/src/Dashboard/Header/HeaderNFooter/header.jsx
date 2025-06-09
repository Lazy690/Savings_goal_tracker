import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '../../../ThemeContext'; // Import the useTheme hook
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from "../../../firebase"
import './header.css';

function Header() {
  const [showtheme, setShowTheme] = useState(false);
  const { toggleTheme } = useTheme(); // Access the toggleTheme function
  const [loadedtheme, setLoadedTheme] = useState()
  const [theme, setTheme] = useState()

   //fetch sotred theme from db
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Theme'), (snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          const fetched = data.reduce((acc, entry) => acc + Boolean(entry.color), 0);
        
          if (fetched === 0) {
            toggleTheme("dark")
          } else {
            toggleTheme("light")
          }
        });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

 

  //theme toggler
  const toggletheme = () => {
    setShowTheme((prev) => !prev);
  };

  //handle dark mode
  const handledarkmode = async () =>{
  toggleTheme("dark")
  
  try {
        await setDoc(doc(db, "Theme", "color" ), {
          color: false
        });
      } catch (err) {
        console.error("Error adding document:", err);
      }
  }

  //handle light mode

   //handle dark mode
   const handlelightmode = async () =>{
    toggleTheme("light")
    
    try {
      await setDoc(doc(db, "Theme", "color" ), {
        color: true
      });
    } catch (err) {
      console.error("Error adding document:", err);
    }
}
     const navigate = useNavigate();

  return (
    <div className="header">
      <span className="buton-wrap">
        <button className="goal-button">Goals</button>

        <button className="goal-button" onClick={toggletheme}>
          Theme
        </button>

        <button className="goal-button" onClick={() => navigate("/login")}>Log Out</button>
        {showtheme && (
          <div className="theme-overlay">
            <div>
              <button
                className="color-dark-blue color"
                onClick={() => {handledarkmode()}}
              ></button>
            </div>
            <div>
              <button
                className="color-light-blue color"
                onClick={() => handlelightmode()}
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