import React, { useState} from 'react';
import './Buttons.css'; // Import the CSS

export default function Take() {
  const [showForm, setShowForm] = useState(false);
  const [TotalSave, setTotalsave] = useState(null);
  
  
 
  const handleOpen = () => {setShowForm(true);
    fetch('http://localhost:3001/Saved')
      .then(res => res.json())
      .then(data => {
      const fetched = data.reduce((acc, entry) => acc + Number(entry.TotalSaved), 0);
      setTotalsave(fetched)});
     
      }
  

 

  const handleClose = () => setShowForm(false);

  const handleSubmit = (e) => {
    
    let amount = document.getElementById("amount");
    let amountvalue = amount.value
    
    if (amountvalue > TotalSave) {
      e.preventDefault();
      alert("Value exedes your Total.")
      document.getElementById("form").reset();      
    } else {
    let category = document.getElementById("category");
    let categoryvalue = category.value
    

    let notes = document.getElementById("notes");
    let notesvalue = notes.value
    e.preventDefault();

    fetch('http://localhost:3001/Take', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Amount: amountvalue, Category: categoryvalue, Notes: notesvalue}) 
    })
    handleClose();
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
