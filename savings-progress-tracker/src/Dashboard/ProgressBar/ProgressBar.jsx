import React, { useState, useEffect } from 'react';
import './Progressbar.css';





export default function ProgressBar() {

  
  const [totalAdd, setTotalAdd] = useState(0);
  const [totalTake, setTotalTake] = useState(0);
  const [totalsaved, setTotalsave] = useState(0);
  const [totalleft, setTotalleft] = useState(0);
  const [totalpromised, setTotalPromised] = useState(0);
  const [totallended, setTotalLended] = useState(0);
  const [deptbar, setDeptBar] = useState(0);
  const [Percentage, setPercentage] = useState(0);



  // Fetch total from "Add"
  useEffect(() => {
    fetch('http://localhost:3001/Add')
      .then(res => res.json())
      .then(data => {
        const sum = data.reduce((acc, entry) => acc + Number(entry.Amount), 0);
        setTotalAdd(sum);
      });
  }, []);

  // Fetch total from "Take"
  useEffect(() => {
    fetch('http://localhost:3001/Take')
      .then(res => res.json())
      .then(data => {
        const sum = data.reduce((acc, entry) => acc + Number(entry.Amount), 0);
        setTotalTake(sum);
      });
  }, []); 
  
   
  
  // fetch and Calculate dept 
  //Promised:
  useEffect(() => {
  fetch('http://localhost:3001/Dept')
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(entry => entry.Type === "Promised");
      const sum = filtered.reduce((acc, entry) => acc + Number(entry.Amount), 0);
      setTotalPromised(sum);
    });
}, []);

  //Lended:
  useEffect(() => {
  fetch('http://localhost:3001/Dept')
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(entry => entry.Type === "Lended");
      const sum = filtered.reduce((acc, entry) => acc + Number(entry.Amount), 0);
      setTotalLended(sum);
    });
}, []);

// Calculate totalsaved and totalleft
  useEffect(() => {
    const totalsaved = totalAdd - totalTake - totallended;
    const totalleft = 1000000 - totalsaved;
    setTotalsave(totalsaved);
    setTotalleft(totalleft);
    const deptbar = totalAdd - totalTake + totalpromised;
    setDeptBar(deptbar);
  }, [totalAdd, totalTake, totallended, totalpromised]);

  //progress bar and dept bar calculations:

  useEffect(()=> {
    const goal = 1000000;
    const current = totalsaved;
    const deptcurrent = deptbar;

    const percentage = Math.floor(Math.min((current / goal) * 100, 100));
    const deptpercentage = Math.min((deptcurrent / goal) * 100, 100).toFixed(1);
    const fill = document.getElementById("fill");
    const deptfill = document.getElementById("deptfill");
    

    fill.style.width = percentage + "%";
    deptfill.style.width = deptpercentage + "%";
    setPercentage(percentage)
    console.log(totalsaved)
  
})

 // Store total saved
useEffect(() => {
  const interval = setInterval(() => {
    fetch('http://localhost:3001/Saved')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          // Use the totalsaved variable to update the TotalSaved value
          fetch(`http://localhost:3001/Saved/${data[0].id}`, {
            method: 'PATCH', // or 'PUT' depending on your server
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ TotalSaved: totalsaved }),
          });
        }
      });
  }, 1000);

  return () => clearInterval(interval);
}, [totalsaved]); // Add totalsaved as a dependency

//to format huge numbers:

function formatWithDots(value) {
  const number = Number(value);
  if (isNaN(number)) return value; // Fallback if not a number

  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
}



  //html section
  
  const background = {
    
    width: "500px",
    padding: "10px",
    marginRight: "15px"
    
  };

  return (
    <div style={background}>


      <div className='display'>
        <div className='progress-info'>
          <span className='saved-display'>Saved:</span>
          <span className='saved-value-display'>Kz{formatWithDots(totalsaved)}</span>
        </div>

        <div className='progress-info'>
          <span className='saved-display'>Left:</span>
          <span className='saved-value-display'>Kz{formatWithDots(totalleft)}</span>
        </div>
      </div>  


      <div className='bar'>
        <div className='deptfill' id='deptfill'>
          
        </div>
        
        <div class="fill" id="fill">
          <span class="filltooltip-wrapper">
            <span class="filltooltiptext"></span>
          </span>
        </div>
        <div className='label'>{Percentage}%</div>
      </div>
      
    </div>
  );
}
