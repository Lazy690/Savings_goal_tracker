import React from 'react';
import Header from "./Header/HeaderNFooter/header";
import Footer from "./Header/HeaderNFooter/footer";
import Buttons from "./Buttons/button.main";
import ProgressBar from "./ProgressBar/ProgressBar";
import "../index.css";

function Dashboard() {
  return (
    <div>  
      <div className="Appdiv">
        <div className="BackGroundModalUI">
          <>
            <Header />
            <ProgressBar />
            <Buttons />
          </>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;