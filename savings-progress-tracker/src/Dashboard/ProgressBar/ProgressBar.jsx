import React, { useState, useEffect } from 'react';
import './Progressbar.css';

export default function ProgressBar() {

    //get data from db:

        //total of add
    const [totalAdd, setTotalAdd] = useState(0);
      
        useEffect(() => {
        fetch('http://localhost:3001/Add')
            .then(res => res.json())
            .then(data => {
              const sum = data.reduce((acc, entry) => acc + Number(entry.Amount), 0);
              setTotalAdd(sum);
              });
        },)
        //total of take

    const [totalTake, setTotalTake] = useState(0);
        
        useEffect(() => {
            fetch('http://localhost:3001/Take')
            .then(res => res.json())
            .then(data => {
              const sum = data.reduce((acc, entry) => acc + Number(entry.Amount), 0);
              setTotalTake(sum);
              });
        },)

    //calculations:

    const [totalsaved, setTotalsave] = useState(0);
    const [totalleft, setTotalleft] = useState(0);

        useEffect(() => {
            setTotalsave(totalAdd - totalTake)
            setTotalleft(1000000 - totalsaved)
        },)




    //UI:
    const background = {
        margin: "40px",
        width: "500px",
        borderRadius: "8px",
        border: "1px solid",
        padding: "10px",
        background: "gray",}
            
    
            
    return(
        <div style={background}>
            <div>Saved: {totalsaved}</div>
            <div>Left: {totalleft}</div>
            <div>Goal: 1000000</div>
                
        </div>
    );
}
