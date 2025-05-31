import React, { useState} from 'react';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase.js'; 
import '../Buttons.css';    

export default function Take() {
  const [showForm, setShowForm] = useState(false);
  const [TotalSave, setTotalsave] = useState(null);
  
  
 
  const handleOpen = () => {
    setShowForm(true);
    const unsubscribe = onSnapshot(collection(db, 'Saved'), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      const fetched = data.reduce((acc, entry) => acc + Number(entry.TotalSaved), 0);
      setTotalsave(fetched); // Update the TotalSave state in real-time
    });
  
    // Optionally, you can clean up the listener when the form is closed
    return () => unsubscribe();
      }
  

 

  const handleClose = () => setShowForm(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let amount = document.getElementById("amount");
    let amountvalue = amount.value
    
    if (amountvalue > TotalSave) {
      e.preventDefault();
      alert("Value exedes your Total.")
      document.getElementById("form").reset();      
    } else {
      handleClose();
      
      
    let category = document.getElementById("category");
    let categoryvalue = category.value
    

    let notes = document.getElementById("notes");
    let notesvalue = notes.value

        //get date

        const currentDate = new Date();

        // Get the month name
        const monthNames = [ "January", "February", 
                            "March", "April", "May", "June",
                            "July", "August", "September", 
                            "October", "November", "December"
        ];
        const currentMonth = monthNames[currentDate.getMonth()];
    
        // Get the day of the month
        const currentDay = currentDate.getDate();
    
        // Get the year
        const currentYear = currentDate.getFullYear();
    
        // Construct the current day string
        let datevalue = currentMonth + " " + currentDay + 
                                                ", " + currentYear;

    

    try {
         await addDoc(collection(db, "Take"), {
           Amount: amountvalue,
           Category: categoryvalue,
           Date: datevalue,
           Notes: notesvalue
         });
       } catch (err) {
         console.error("Error adding document:", err);
       }
    
    }
  };

  //to format huge numbers:

function formatWithDots(value) {
  const number = Number(value);
  if (isNaN(number)) return value; // Fallback if not a number

  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
}

  return (
    <div>
      {/* Open button */}
      <button onClick={handleOpen} className="open-btn">
        Take Money
      </button>

      {/* Popup form */}
      {showForm && (
        <div className="overlay">
          <div className="modal">
            <h2>Take Money</h2>
            <form id="form" onSubmit={handleSubmit}>
            <div>
                <label>
                  You have <b>{formatWithDots(TotalSave)}</b> saved.
                </label><br></br>
                <label>
                  Amount:
                </label>
                <br></br>
                <input type="text" id="amount" required />
                <br></br>
                <label>
                  Category:
                </label>
                <br></br>
                <input type="text" id="category" required />
                <br></br>
                <label>
                  Notes:
                </label>
                <br></br>
                <input type="text" id="notes" />
              </div>
              <br />
              <button className='open-btn' type="submit">Take</button>
              <button className='open-btn' onClick={handleClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
