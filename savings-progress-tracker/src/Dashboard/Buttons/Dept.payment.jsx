import { useState, useEffect } from 'react';
import './Buttons.css'; 

export default function DeptPayment() {

  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deptlist, setDeptList] = useState([]);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);


  const handleOpen = () => setShowForm(true);
  const handleClose = () => setShowForm(false);
  const handleDeleteOpen = () => setShowDelete(true);
  const handleDeleteClose = () => setShowDelete(false);
  
  //fetch the list of depts
  useEffect(() => {
    fetch('http://localhost:3001/Dept')
      .then(res => res.json())
      .then(data => setDeptList(data));
  }, []);

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
                  <button className='open-btn' onClick={() => {
                    setPendingDeleteId(Dept.id);
                    handleDeleteOpen();
                  }}>❌</button>

                </li>
              ))}
            </ul>
            {/* Popup form */}
            {showDelete && (
                <div className="overlay">
                  <div className="modal">
                    <h2>Are you sure you want to delete this dept?</h2>
                    <button
                        onClick={() => {
                        fetch(`http://localhost:3001/Dept/${pendingDeleteId}`, {
                          method: 'DELETE',
                        })
                          .then(() => {
                            setDeptList(prev => prev.filter(d => d.id !== pendingDeleteId));
                            setPendingDeleteId(null);
                            handleDeleteClose();
                          });
                      }}
                      className='open-btn'
                    >
                      Yes
                    </button>

                    <button onClick={handleDeleteClose} className='open-btn'>No</button>
                  </div>   
                </div>

            )}
            <form onSubmit={handleClose}>
              
              <br />
              <button className='open-btn'>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
