import { useState, useEffect } from 'react';
import "./records.css";

export default function Recordcontent() {

    //Show the lists
  const [showdept, setShowDept] = useState(false);
  const [showdadd, setShowAdd] = useState(false);
  const [showdtake, setShowTake] = useState(false);


  const [deptlist, setDeptList] = useState([]);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const handleOpen = () => setShowDept(true);
  const handleClose = () => setShowDept(false);

  // Fetch the list of depts
  useEffect(() => {
    fetch('http://localhost:3001/Dept')
      .then(res => res.json())
      .then(data => setDeptList(data));
  }, []);

  // Fetch the list of add
  useEffect(() => {
    fetch('http://localhost:3001/Add')
      .then(res => res.json())
      .then(data => setDeptList(data));
  }, []);

  // Fetch the list of take
  useEffect(() => {
    fetch('http://localhost:3001/Dept')
      .then(res => res.json())
      .then(data => setDeptList(data));
  }, []);

  return (
    <div>
      <div className="record-tab">
        <div>
          <button className="open-btn" onClick={handleOpen}>Add</button>
          <button className="open-btn" onClick={handleOpen}>Take</button>
          <button className="open-btn" onClick={handleOpen}>Dept</button>
        </div>
      </div>
      <div className="record-content">
        <div className="record-window">
          {/* Open Dept List */}
          {showdept && (
            <ul>
              {deptlist.map((Dept) => (
                <li key={Dept.id} className="deptlist">
                  <span>
                    {Dept.Amount} - {Dept.Type} - {Dept.Who} - {Dept.Notes}
                  </span>
                  <button
                    className="open-btn"
                    onClick={() => {
                      setPendingDeleteId(Dept.id);
                      handleClose(); // Optionally close the list after delete
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
          {/* Open Add List */}
          {showdept && (
            <ul>
              {deptlist.map((Dept) => (
                <li key={Dept.id} className="deptlist">
                  <span>
                    {Dept.Amount} - {Dept.Type} - {Dept.Who} - {Dept.Notes}
                  </span>
                  <button
                    className="open-btn"
                    onClick={() => {
                      setPendingDeleteId(Dept.id);
                      handleClose(); // Optionally close the list after delete
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
          {/* Open Take List */}
          {showdept && (
            <ul>
              {deptlist.map((Dept) => (
                <li key={Dept.id} className="deptlist">
                  <span>
                    {Dept.Amount} - {Dept.Type} - {Dept.Who} - {Dept.Notes}
                  </span>
                  <button
                    className="open-btn"
                    onClick={() => {
                      setPendingDeleteId(Dept.id);
                      handleClose(); // Optionally close the list after delete
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}