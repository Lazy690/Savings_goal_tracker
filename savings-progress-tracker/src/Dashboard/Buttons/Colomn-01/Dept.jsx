import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase.js'; 
import '../Buttons.css';  



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

  const handleSubmit = async (e) => { //to get the value of the selection box
    e.preventDefault();
    handleClose();
    
    //now to get the values of the other entry boxes
    let amount = document.getElementById("amount");
    let amountvalue = amount.value
    

    let who = document.getElementById("who");
    let whovalue = who.value
    

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
             await addDoc(collection(db, "Dept"), {
               Amount: amountvalue,
               Type: selection,
               Date: datevalue,
               Notes: notesvalue
             });
           } catch (err) {
             console.error("Error adding document:", err);
             
           }
    }

    
  

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
                    <button type="button" className='open-btn'>▼</button>
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
              <button type="submit" className='open-btn'>Add</button>
              <button onClick={handleClose} className='open-btn'>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
