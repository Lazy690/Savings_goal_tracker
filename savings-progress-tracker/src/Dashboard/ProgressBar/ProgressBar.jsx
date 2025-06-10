import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase.js'; 

import './Progressbar.css';

export default function ProgressBar() {

  const user = auth.currentUser;

  const [totalAdd, setTotalAdd] = useState(0);
  const [totalTake, setTotalTake] = useState(0);
  const [totalsaved, setTotalsave] = useState(0);
  const [totalleft, setTotalleft] = useState(0);
  const [totalpromised, setTotalPromised] = useState(0);
  const [totallended, setTotalLended] = useState(0);
  const [deptbar, setDeptBar] = useState(0);
  const [Percentage, setPercentage] = useState(0);

  // Fetch TotalSaved from Firestore on page load
  useEffect(() => {
    if (!user) return; // Ensure user is defined

    const docRef = doc(db, "users", user.uid, "Data", "Saved");

    const fetchTotalSaved = async () => {
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setTotalsave(data.TotalSaved || 0); // Initialize totalsaved with the value from Firestore
      } else {
        console.error("Document does not exist.");
      }
    };

    fetchTotalSaved();
  }, [user]);

  // Update TotalSaved in Firestore when totalsaved changes
  useEffect(() => {
    if (!user || totalsaved === 0) return; // Ensure user is defined and totalsaved is not 0

    const docRef = doc(db, "users", user.uid, "Data", "Saved");

    updateDoc(docRef, {
      TotalSaved: Number(totalsaved)
    }).catch((err) => {
      console.error("Error updating TotalSaved:", err);
    });
  }, [totalsaved, user]);

  // Fetch total from "Add"
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users", user.uid, "Add"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      const sum = data.reduce((acc, entry) => acc + Number(entry.Amount), 0);
      setTotalAdd(sum); // Update the totalAdd state in real-time
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [user]);

  // Fetch total from "Take"
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users", user.uid, "Take"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      const sum = data.reduce((acc, entry) => acc + Number(entry.Amount), 0);
      setTotalTake(sum); // Update the totalTake state in real-time
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [user]);

  // Fetch and calculate Dept → Promised
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users", user.uid, 'Dept'), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      const filtered = data.filter(entry => entry.Type === 'Promised');
      const sum = filtered.reduce((acc, entry) => acc + Number(entry.Amount), 0);
      setTotalPromised(sum);
    });
    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  // Fetch and calculate Dept → Lended

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users", user.uid, 'Dept'), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      const filtered = data.filter(entry => entry.Type === 'Lended');
      const sum = filtered.reduce((acc, entry) => acc + Number(entry.Amount), 0);
      setTotalLended(sum);
    });
    return () => unsubscribe(); // Cleanup the listener on component unmount
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

  // Progress bar and dept bar calculations
  useEffect(() => {
    const goal = 1000000;
    const current = totalsaved;
    const deptcurrent = deptbar;

    const percentage = Math.floor(Math.min((current / goal) * 100, 100));
    const deptpercentage = Math.min((deptcurrent / goal) * 100, 100).toFixed(1);
    const fill = document.getElementById("fill");
    const deptfill = document.getElementById("deptfill");

    if (fill) fill.style.width = percentage + "%";
    if (deptfill) deptfill.style.width = deptpercentage + "%";
    setPercentage(percentage);
  }, [totalsaved, deptbar]);

  // Format numbers with dots
  function formatWithDots(value) {
    const number = Number(value);
    if (isNaN(number)) return value; // Fallback if not a number

    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  }

  // HTML section
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
        <div className='deptfill' id='deptfill'></div>
        <div className="fill" id="fill">
          <span className="filltooltip-wrapper">
            <span className="filltooltiptext"></span>
          </span>
        </div>
        <div className='label'>{Percentage}%</div>
      </div>
    </div>
  );
}