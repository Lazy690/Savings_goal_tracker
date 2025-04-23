import Add from "./Add";
import Take from "./Take";
import Dept from "./Dept";
import DeptPayment from "./Dept.payment";

function Buttons() {
    
        const background = {
            margin: "auto",
            width: "500px",
            
            
            padding: "10px",
            background: "#060a14",
            

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