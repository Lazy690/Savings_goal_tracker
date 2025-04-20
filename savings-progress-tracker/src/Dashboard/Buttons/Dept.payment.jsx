import { useState, useEffect } from 'react';
import './PopupForm.css'; // Import the CSS

export default function DeptPayment() {
  const [showForm, setShowForm] = useState(false);
  const [deptlist, setDeptList] = useState([]);

  const handleOpen = () => setShowForm(true);
  const handleClose = () => setShowForm(false);
  
  //fetch the list of depts
  useEffect(() => {
    fetch('http://localhost:3001/Dept')
      .then(res => res.json())
      .then(data => setDeptList(data));
  }, []);

 function handleDelete(id) {
    fetch(`http://localhost:3001/Dept/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setDeptList(prevdeptlist => prevdeptlist.filter(Dept=> Dept.id !== id));
    });
  }
  
  
  
  
  

  return (
    <div>
      {/* Open button */}
      <button onClick={handleOpen} className="open-btn">
        Dept Payment
      </button>

      {/* Popup form */}
      {showForm && (
        <div className="overlay">
          <div className="modal">
            <h2>Manage Dept</h2>

            <ul>
                {deptlist.map(Dept => (
                <li key={Dept.id} className="deptlist">
                  <span>{Dept.Amount} - {Dept.Type} - {Dept.Who} - {Dept.Notes}</span>
                  <button onClick={() => handleDelete(Dept.id)}>❌</button>
                </li>
              ))}
            </ul>
            <form onSubmit={handleClose}>
              
              <br />
              <button>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
