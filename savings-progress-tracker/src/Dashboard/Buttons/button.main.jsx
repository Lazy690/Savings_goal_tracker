import Add from "./Add";
import Take from "./Take";
import Dept from "./Dept";
import DeptPayment from "./Dept.payment";
import "./Buttons.css";

function Buttons() {
    
        const background = {
            margin: "auto",
            width: "500px",
            padding: "10px",
                    
        }
        

        
    return(
        <div style= {background}>
            
            <Add/>
            <Take/>
            <Dept/>
            <DeptPayment/>
            
        </div>
    );
}

export default Buttons