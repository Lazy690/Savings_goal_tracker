import React, { useState, useEffect } from 'react';
import './Progressbar.css';

export default function ProgressBar() {
  const [totalAdd, setTotalAdd] = useState(0);
  const [totalTake, setTotalTake] = useState(0);
  const [totalsaved, setTotalsave] = useState(0);
  const [totalleft, setTotalleft] = useState(0);

  // Get total from "Add"
  useEffect(() => {
    fetch('http://localhost:3001/Add')
      .then(res => res.json())
      .then(data => {
        const sum = data.reduce((acc, entry) => acc + Number(entry.Amount), 0);
        setTotalAdd(sum);
      });
  }, []);

  // Get total from "Take"
  useEffect(() => {
    fetch('http://localhost:3001/Take')
      .then(res => res.json())
      .then(data => {
        const sum = data.reduce((acc, entry) => acc + Number(entry.Amount), 0);
        setTotalTake(sum);
      });
  }, []);

  // Calculate and update database when either totalAdd or totalTake changes
  useEffect(() => {
    const total = totalAdd - totalTake;
    const left = 1000000 - total;
    setTotalsave(total);
    setTotalleft(left);

    // Update DB
    fetch('http://localhost:3001/TotalSaved/1', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 1, TotalSaved: total })
    });
  }, [totalAdd, totalTake]);

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
      <div>Saved: {totalsaved}</div>
      <div>Left: {totalleft}</div>
      <div>Goal: 1000000</div>
    </div>
  );
}
