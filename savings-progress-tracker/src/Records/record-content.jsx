import React from 'react';
import { useState, useEffect } from 'react';
import "./records.css";

export default function Recordcontent() {
  const [activeTab, setActiveTab] = useState(null); // Tracks the active tab: "Dept", "Add", or "Take"
  const [deptlist, setDeptList] = useState([]);
  const [addlist, setAddList] = useState([]);
  const [takelist, setTakeList] = useState([]);
  
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  //delete functions Add
  
  const [showDeleteAdd, setShowDeleteAdd] = useState(false);

  const handleDeleteOpenAdd = () => setShowDeleteAdd(true);
  const handleDeleteCloseAdd = () => setShowDeleteAdd(false);
  
  //delete function Take

  const [showDeleteTake, setShowDeleteTake] = useState(false);

  const handleDeleteOpenTake = () => setShowDeleteTake(true);
  const handleDeleteCloseTake = () => setShowDeleteTake(false);

  //delete functions Dept
  
  const [showDeleteDept, setShowDeleteDept] = useState(false);

  const handleDeleteOpenDept = () => setShowDeleteDept(true);
  const handleDeleteCloseDept = () => setShowDeleteDept(false);
  

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
      .then(data => setAddList(data));
  }, []);

  // Fetch the list of take
  useEffect(() => {
    fetch('http://localhost:3001/Take')
      .then(res => res.json())
      .then(data => setTakeList(data));
  }, []);

  return (
    <div>
      <div className="record-tab">
        <div>
          <button className="open-btn" onClick={() => setActiveTab("Add")}>Add</button>
          <button className="open-btn" onClick={() => setActiveTab("Take")}>Take</button>
          <button className="open-btn" onClick={() => setActiveTab("Dept")}>Dept</button>
        </div>
      </div>
      <div className="record-content">
        <div className="record-window">
          {/* Render Add List */}
          {activeTab === "Add" && (
            <ul>
              {addlist.map((Add) => (
                <li key={Add.id} className='deptlist record-list'>
                  
                  <span className='record-list'>
                    Amount: {Add.Amount} <br></br>
                    Category: {Add.Category} <br></br>
                    Date: {Add.Date} <br></br>
                    Notes: {Add.Notes} <br></br>
                  </span>
                  <button
                    className="open-btn"
                    onClick={() => { 
                      setPendingDeleteId(Add.id);
                      handleDeleteOpenAdd();
                     
                    }}
                  >
                    ❌
                  
                  </button>
                </li>
              ))}
            </ul>
          )}
          {showDeleteAdd && (
                <div className="overlay">
                  <div className="modal">
                    <h2>Are you sure you want to delete this Add?</h2>
                    <button
                        onClick={() => {
                        fetch(`http://localhost:3001/Add/${pendingDeleteId}`, {
                          method: 'DELETE',
                        })
                          .then(() => {
                            setDeptList(prev => prev.filter(d => d.id !== pendingDeleteId));
                            setPendingDeleteId(null);
                            handleDeleteCloseAdd();
                          });
                      }}
                      className='open-btn'
                    >
                      Yes
                    </button>

                    <button onClick={handleDeleteCloseAdd} className='open-btn'>No</button>
                  </div>   
                </div>

            )}

          {/* Render Take List */}
          {activeTab === "Take" && (
            <ul>
              {takelist.map((Take) => (
                <li key={Take.id} className="deptlist record-list">
                  <span className='record-list'>
                    Amount: {Take.Amount} <br></br>
                    Category: {Take.Category} <br></br>
                    Date: {Take.Date} <br></br>
                    Notes: {Take.Notes} <br></br>
                  </span>
                  <button
                    className="open-btn"
                    onClick={() => {
                      setPendingDeleteId(Take.id);
                      handleDeleteOpenTake();
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
           {showDeleteTake && (
                <div className="overlay">
                  <div className="modal">
                    <h2>Are you sure you want to delete this Take?</h2>
                    <button
                        onClick={() => {
                        fetch(`http://localhost:3001/Take/${pendingDeleteId}`, {
                          method: 'DELETE',
                        })
                          .then(() => {
                            setDeptList(prev => prev.filter(d => d.id !== pendingDeleteId));
                            setPendingDeleteId(null);
                            handleDeleteCloseTake();
                          });
                      }}
                      className='open-btn'
                    >
                      Yes
                    </button>

                    <button onClick={handleDeleteCloseTake} className='open-btn'>No</button>
                  </div>   
                </div>

            )}
          {/* Render Dept List */}
          {activeTab === "Dept" && (
            <ul>
              {deptlist.map((Dept) => (
                <li key={Dept.id} className="deptlist record-list">
                  <span className='record-list'>
                    Amount: {Dept.Amount} <br></br>
                    Category: {Dept.Category} <br></br>
                    Date: {Dept.Date} <br></br>
                    Who: {Dept.Who} <br></br>
                    Type: {Dept.Type} <br></br>
                    Notes: {Dept.Notes} <br></br>  
                  </span>
                  <button
                    className="open-btn"
                    onClick={() => {
                      setPendingDeleteId(Dept.id);
                      handleDeleteOpenDept();
                      
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
          {showDeleteDept && (
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
                            handleDeleteCloseDept();
                          });
                      }}
                      className='open-btn'
                    >
                      Yes
                    </button>

                    <button onClick={handleDeleteCloseDept} className='open-btn'>No</button>
                  </div>   
                </div>

            )}
        </div>
      </div>
    </div>
  );
}