import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '../../../ThemeContext'; // Import the useTheme hook
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase.js'; 
import './header.css';

function Header() {

    const user = auth.currentUser;
 
  const [showtheme, setShowTheme] = useState(false);
  const { toggleTheme } = useTheme(); // Access the toggleTheme function
 
  //Ask if sure want to logout




   //fetch sotred theme from db
   useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", user.uid, "Theme", "settings"), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const isLightTheme = data.color; // Directly access the color field (true or false)
  
        if (!isLightTheme) {
          toggleTheme("dark");
        } else {
          toggleTheme("light");
        }
      } else {
        // Handle case where document doesn't exist (optional)
        toggleTheme("dark"); // Default to dark if no document
      }
    });
  
    return () => unsubscribe(); // Cleanup listener on unmount
  }, [user.uid]); // Dependency array includes user.uid

 

  //theme toggler
  const toggletheme = () => {
    setShowTheme((prev) => !prev);
  };

  //handle dark mode
  const handledarkmode = async () =>{
  toggleTheme("dark")
  
  try {
        await setDoc(doc(db, "users", user.uid, "Theme", "settings"), {
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
      await setDoc(doc(db, "users", user.uid, "Theme", "settings"), {
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