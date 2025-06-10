import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase.js'; // Ensure the correct path to your firebase.js file
import { onAuthStateChanged } from "firebase/auth";
import "./records.css";

export default function Recordcontent() {
  const [user, setUser] = useState(auth.currentUser); // Track the authenticated user
  const [activeTab, setActiveTab] = useState(null); // Tracks the active tab: "Dept", "Add", or "Take"
  const [deptlist, setDeptList] = useState([]);
  const [addlist, setAddList] = useState([]);
  const [takelist, setTakeList] = useState([]);
  const [pendingDeleteId, setPendingDeleteId] = useState([]);

  // Delete modals
  const [showDeleteAdd, setShowDeleteAdd] = useState(false);
  const [showDeleteTake, setShowDeleteTake] = useState(false);
  const [showDeleteDept, setShowDeleteDept] = useState(false);

  const handleDeleteOpenAdd = () => setShowDeleteAdd(true);
  const handleDeleteCloseAdd = () => setShowDeleteAdd(false);

  const handleDeleteOpenTake = () => setShowDeleteTake(true);
  const handleDeleteCloseTake = () => setShowDeleteTake(false);

  const handleDeleteOpenDept = () => setShowDeleteDept(true);
  const handleDeleteCloseDept = () => setShowDeleteDept(false);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user state
      } else {
        console.error("User is not authenticated.");
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  // Fetch the list of depts in real-time
  useEffect(() => {
    if (!user) return; // Ensure user is defined

    const unsubscribe = onSnapshot(collection(db, "users", user.uid, "Dept"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setDeptList(data);
    });

    return () => unsubscribe();
  }, [user]);

  // Fetch the list of adds in real-time
  useEffect(() => {
    if (!user) return; // Ensure user is defined

    const unsubscribe = onSnapshot(collection(db, "users", user.uid, "Add"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setAddList(data);
    });

    return () => unsubscribe();
  }, [user]);

  // Fetch the list of takes in real-time
  useEffect(() => {
    if (!user) return; // Ensure user is defined

    const unsubscribe = onSnapshot(collection(db, "users", user.uid, "Take"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTakeList(data);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return <div>Please log in to view your records.</div>;
  }

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
                    Amount: {Add.Amount} <br />
                    Category: {Add.Category} <br />
                    Date: {Add.Date} <br />
                    Notes: {Add.Notes} <br />
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
                  onClick={async () => {
                    try {
                      handleDeleteCloseAdd();
                      await deleteDoc(doc(db, "users", user.uid, "Add", pendingDeleteId));
                      setPendingDeleteId(null);
                      
                    } catch (err) {
                      console.error("Error deleting document:", err);
                    }
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
                    Amount: {Take.Amount} <br />
                    Category: {Take.Category} <br />
                    Date: {Take.Date} <br />
                    Notes: {Take.Notes} <br />
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
                  onClick={async () => {
                    try {
                      handleDeleteCloseTake();
                      await deleteDoc(doc(db, "users", user.uid, "Take", pendingDeleteId));
                      setPendingDeleteId(null);
  
                    } catch (err) {
                      console.error("Error deleting document:", err);
                    }
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
                    Amount: {Dept.Amount} <br />
                    Category: {Dept.Category} <br />
                    Date: {Dept.Date} <br />
                    Who: {Dept.Who} <br />
                    Type: {Dept.Type} <br />
                    Notes: {Dept.Notes} <br />
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
                <h2>Are you sure you want to delete this Dept?</h2>
                <button
                  onClick={async () => {
                    try {
                      handleDeleteCloseDept();
                      await deleteDoc(doc(db, "users", user.uid, "Dept", pendingDeleteId));
                      setPendingDeleteId(null);
                      
                    } catch (err) {
                      console.error("Error deleting document:", err);
                    }
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