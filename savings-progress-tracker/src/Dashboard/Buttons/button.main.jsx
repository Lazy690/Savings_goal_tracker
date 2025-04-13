import Add from "./Add";
import Take from "./Take";
import Dept from "./Dept";
import DeptPayment from "./Dept.payment";

function Buttons() {
    
        const background = {
            margin: "auto",
            width: "500px",
            borderRadius: "8px",
            border: "1px solid",
            
            padding: "10px",
            background: "gray",
            

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