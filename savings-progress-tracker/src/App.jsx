import Header from "./Dashboard/header";
import Footer from "./Dashboard/footer";
import Buttons from "./Dashboard/Buttons/button.main";
import ProgressBar from "./Dashboard/ProgressBar/ProgressBar";
import "./index.css";

function App() {

  
  return(
    <div className="Appdiv">
      <div className="BackGroundModalUI">
        <>
        <Header/>
        <ProgressBar/>
        <Buttons/>
        </>
        
      
      </div> 
      <Footer/>
        
    </div>
  );
}

export default App
