import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js'; 
import { useNavigate } from "react-router-dom";
import "./sign&login.css"

export default function SignUp() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        passConfirm: ''
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { userName, email, password, passConfirm } = formData;

        if (password !== passConfirm) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create user profile in Firestore
            await setDoc(doc(db, "users", user.uid), {
                userName: userName,
                email: user.email,
                createdAt: new Date(),
            });
            

            // Add a default Theme subcollection
            await setDoc(doc(db, "users", user.uid, "Theme", "settings"), {
                color: false
            }, { merge: true });

             // Add a default Saved document
            await setDoc(doc(db, "users", user.uid, "Data", "Saved"), {
                TotalSaved: Number(0)
            }, { merge: true });
            

            alert("Sign up successful!");
            navigate("/"); 
        } catch (error) {
            console.error("Error during signup:", error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold">Create Account</h2>
                <div>
                    <label htmlFor="userName" className="block">User Name</label><br/>
                    <input
                        id="userName"
                        type="text"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block">Email</label><br/>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="Log-input"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block">Password</label><br/>
                    <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="Log-input"
                    />
                </div>
                <div>
                    <label htmlFor="passConfirm" className="block">Confirm Password</label><br/>
                    <input
                        id="passConfirm"
                        type="password"
                        value={formData.passConfirm}
                        onChange={handleChange}
                        required
                        className="Log-input"
                    />
                </div>
                <button
                    type="submit"
                    className="log-button1"
                >
                    Create Account
                </button>
            </form>
            <div className="mt-4 text-center">
                <p>Already have an account?</p>
                <button
                    onClick={() => navigate("/login")}
                    className="log-button2"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
}