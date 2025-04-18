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

//Calculate dept impact




  //progress bar and dept bar calculations:

  useEffect(()=> {
    const goal = 1000000;
    const current = totalsaved;
    const deptcurrent = deptbar;

    const percentage = Math.min((current / goal) * 100, 100).toFixed(1);
    const deptpercentage = Math.min((deptcurrent / goal) * 100, 100).toFixed(1);
    const fill = document.getElementById("fill");
    const deptfill = document.getElementById("deptfill");
    const label = document.getElementById("label");

    fill.style.width = percentage + "%";
    deptfill.style.width = deptpercentage + "%";
    label.textContent = `${current} / ${goal}`;
  
})
  
  //html section
  
  const background = {
    margin: "40px",
    width: "500px",
    borderRadius: "8px",
    border: "1px solid",
    padding: "10px",
    background: "gray",
  };

  return (
    <div style={background}>
      <div className='bar'>
        <div className='deptfill' id='deptfill'></div>
        <div className='fill' id='fill'></div>
        <div className='label' id='label'></div>
      </div>
      <p>Left: {totalleft}</p>
    </div>
  );
}
