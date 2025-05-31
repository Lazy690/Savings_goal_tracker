import React, { useState } from 'react';
import '../Buttons.css'; 



export default function Add() {
  const [showForm, setShowForm] = useState(false);

  const handleOpen = () => setShowForm(true);
  const handleClose = () => setShowForm(false);
  

  const handleSubmit = (e) => {
    let amount = document.getElementById("amount");
    let amountvalue = amount.value
    

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



    e.preventDefault();

    fetch('http://localhost:3001/Add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Amount: amountvalue, Category: categoryvalue, Date: datevalue ,Notes: notesvalue}) 
    })
    handleClose();
  };

  return (
    <div>
      {/* Open button */}
      <button onClick={handleOpen} className="open-btn">
        Add Money
      </button>

      {/* Popup form */}
      {showForm && (
        <div className="overlay">
          <div className="modal">
            <h2>Add Money</h2>
            <form onSubmit={handleSubmit}>
              <div>
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
                <input type="text" id="notes"/>
              </div>
              <br />
              <button type="submit" className='open-btn'>Add</button>
              <button onClick={handleClose} className='open-btn'>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
