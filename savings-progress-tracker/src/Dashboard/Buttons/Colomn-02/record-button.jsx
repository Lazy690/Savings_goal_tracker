import { useNavigate } from "react-router-dom";
import '../Buttons.css'; 


export default function RecordButton() {
    const navigate = useNavigate();

    return(
        <div>
            <button onClick={() => navigate("/records")} className='open-btn'>Records</button>
        </div>

    )
}