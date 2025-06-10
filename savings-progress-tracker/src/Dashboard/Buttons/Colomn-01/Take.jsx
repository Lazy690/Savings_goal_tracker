import React, { useState } from 'react';
import { collection, onSnapshot, addDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../../firebase.js'; 
import '../Buttons.css';    

export default function Take() {
  const user = auth.currentUser;

  const [showForm, setShowForm] = useState(false);
  const [TotalSave, setTotalsave] = useState(null);

  const handleOpen = () => {
    setShowForm(true);

    const unsubscribe = onSnapshot(doc(db, "users", user.uid, "Data", "Saved"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setTotalsave(data.TotalSaved || 0); // Update the TotalSave state with the value from Firestore
      } else {
        console.error("Document does not exist.");
      }
    });

    // Optionally, you can clean up the listener when the form is closed
    return () => unsubscribe();
  };

  const handleClose = () => setShowForm(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let amount = document.getElementById("amount");
    let amountvalue = Number(amount.value); // Ensure it's a number

    if (amountvalue > TotalSave) {
      alert("Value exceeds your total saved amount.");
      document.getElementById("form").reset();
      return;
    }

    handleClose();

    let category = document.getElementById("category");
    let categoryvalue = category.value;

    let notes = document.getElementById("notes");
    let notesvalue = notes.value;

    // Get the current date
    const currentDate = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const datevalue = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    try {
      await addDoc(collection(db, "users", user.uid, "Take"), {
        Amount: amountvalue,
        Category: categoryvalue,
        Date: datevalue,
        Notes: notesvalue
      });
    } catch (err) {
      console.error("Error adding document:", err);
    }
  };

  // Format numbers with dots
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
              <button className="open-btn" type="submit">Take</button>
              <button className="open-btn" onClick={handleClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}