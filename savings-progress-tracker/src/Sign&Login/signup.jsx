import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js'; 
import { useNavigate } from "react-router-dom";

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
                TotalSaved: 0
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
                    <label htmlFor="userName" className="block">Username:</label>
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
                    <label htmlFor="email" className="block">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="passConfirm" className="block">Confirm Password:</label>
                    <input
                        id="passConfirm"
                        type="password"
                        value={formData.passConfirm}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Create Account
                </button>
            </form>
            <div className="mt-4 text-center">
                <p>Already have an account?</p>
                <button
                    onClick={() => navigate("/login")}
                    className="text-blue-500 hover:underline"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
}