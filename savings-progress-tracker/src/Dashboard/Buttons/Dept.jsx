import React, { useState } from 'react';
import './PopupForm.css'; 

export default function Dept() {
  const [showForm, setShowForm] = useState(false);
  //Type:
 
  const [inputValue, setInputValue] = useState('');
  const [selection, setSelection] = useState(null); 
  
  

  const handleOpen = () => setShowForm(true);
  const handleClose = () => setShowForm(false);
  const handleSelect = (value) => {
    setSelection(value);
    setInputValue(value); // puts it in the box
  };

  const handleSubmit = (e) => { //to get the value of the selection box
    e.preventDefault();
    handleClose();
    
    //now to get the values of the other entry boxes
    let amount = document.getElementById("amount");
    let amountvalue = amount.value
    

    let who = document.getElementById("who");
    let whovalue = who.value
    

    let notes = document.getElementById("notes");
    let notesvalue = notes.value
    e.preventDefault();

    fetch('http://localhost:3001/Dept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Amount: amountvalue, Who: whovalue , Notes: notesvalue, Type: selection})
      
    })

    
  };

  return (
    <div>
      {/* Open button */}
      <button onClick={handleOpen} className="open-btn">
        Add Dept
      </button>

      {/* Popup form */}
      {showForm && (
        <div className="overlay">
          <div className="modal">
            <h2>Dept</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label>
                  Amount:
                </label>
                <br></br>
                <input type="text" id="amount" required />
                <br></br>
                <label>
                  Who owes you?
                </label>
                <br></br>
                <input type="text" id="who" required />
                <br></br>
                <label htmlFor="preference">Type:</label>
                <br></br>
                  <input
                    type="text"
                    id="preference"
                    value={inputValue}
                    readOnly
                    placeholder="Type"
                    requ
                  />

                  <div className="dropdown">
                    <button type="button" className="dropbtn">▼</button>
                    <div className="dropdown-content">
                      <div onClick={() => handleSelect('Lended')}>Lended</div>
                      <div onClick={() => handleSelect('Promised')}>Promised</div>
                    </div>
                  </div>

                
                <br></br>
                <label>
                  Notes:
                </label>
                <br></br>
                <input type="text" id="notes"/>
              </div>
              <br />
              <button type="submit">Add</button>
              <button onClick={handleClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
