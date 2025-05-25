import { useNavigate } from "react-router-dom";
import "./records.css";
import React from 'react';


export default function Recordsheader() {
const navigate = useNavigate();

    return(
        <div className="record-header">
            <h1 className="record-goal">Gaming PC</h1>
            <div className="exit-record">
            <button onClick={() => navigate("/")} className="open-btn">❌</button>
            </div>
        </div> 
    );
}