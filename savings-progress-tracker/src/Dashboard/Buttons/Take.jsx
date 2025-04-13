import React, { useState } from 'react';
import './PopupForm.css'; // Import the CSS

export default function Take() {
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
    e.preventDefault();

    fetch('http://localhost:3001/Take', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Amount: amountvalue, Category: categoryvalue, Notes: notesvalue}) 
    })
    handleClose();
  };

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
                <input type="text" id="notes" />
              </div>
              <br />
              <button type="submit">Take</button>
              <button onClick={handleClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
