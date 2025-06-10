import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Records from "./Records/records.jsx";
import RequireAuth from './RequireAuth.jsx';
import Dashboard from "./Dashboard/Dashboard-main.jsx";
import Login from "./Sign&Login/login.jsx";
import SignUp from './Sign&Login/signup.jsx';
import "./index.css";

function App() {

  
  return(
    <div className="Appdiv">
      <div className="BackGroundModalUI">
       
        <Routes>
          <Route path="/" element={
             <RequireAuth>
              <Dashboard/> 
            </RequireAuth>
            } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/records" element={<Records />} />
        </Routes>
      
      </div> 
     
        
    </div>
  );
}

export default App
