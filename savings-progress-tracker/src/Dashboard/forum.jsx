import React, { useState } from 'react';
import './PopupForm.css'; // Import the CSS

export default function PopupForm() {
  const [showForm, setShowForm] = useState(false);

  const handleOpen = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    handleClose();
  };

  return (
    <div>
      {/* Open button */}
      <button onClick={handleOpen} className="open-btn">
        Open Form
      </button>

      {/* Popup form */}
      {showForm && (
        <div className="overlay">
          <div className="modal">
            <h2>Popup Form</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" required />
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
