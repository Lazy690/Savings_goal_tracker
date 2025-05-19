import Add from "./Colomn-01/Add";
import Take from "./Colomn-01/Take";
import Dept from "./Colomn-01/Dept";
import DeptPayment from "./Colomn-01/Dept.payment";
import Records from "./Colomn-02/record";
import "./Buttons.css";

export default function Buttons() {
    
       
        

        
    return(
        <div className="Button-container">
            <div className="colomn-buttons">
                <Add/>
                <Take/>
                <Dept/>
                <DeptPayment/>
            </div>
            <div className="colomn-buttons">
                <Records/>
            </div>
        </div>
    );
}

