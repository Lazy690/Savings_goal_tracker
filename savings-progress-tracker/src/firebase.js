// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4A0i62OEFVXiWf4wCyJRn5NNd0HDXII0",
  authDomain: "savings-progress-tracker.firebaseapp.com",
  projectId: "savings-progress-tracker",
  storageBucket: "savings-progress-tracker.firebasestorage.app",
  messagingSenderId: "746476868030",
  appId: "1:746476868030:web:b4a680a2839cf7e2af29ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Export Firestore
const db = getFirestore(app);
export { db, auth};