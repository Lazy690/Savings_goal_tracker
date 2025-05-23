import { Routes, Route, Link } from "react-router-dom";
import Records from "./Records/records.jsx";
import Dashboard from "./Dashboard/Dashboard-main.jsx"
import "./index.css";

function App() {

  
  return(
    <div className="Appdiv">
      <div className="BackGroundModalUI">
       
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/records" element={<Records />} />
        </Routes>
      
      </div> 
     
        
    </div>
  );
}

export default App
