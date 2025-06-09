import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default function Login() {

    const navigate = useNavigate();

     const handleSubmit = async (e) => {
            e.preventDefault();
            
            let email = document.getElementById("email");
            let emailvalue = email.value
            let password = document.getElementById("password");
            let passwordvalue = password.value
                
            const auth = getAuth();
            signInWithEmailAndPassword(auth, emailvalue, passwordvalue)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Invalid Email or Password!")
            });
        
        
        }
    //HTML

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Login to Your Account</label>

                    <label>Email:</label>
                    <input id="email" type="email"></input>

                    <label>PassWord:</label>
                    <input id="password" type="password"></input>

                    <button type="submit">Login</button>
                </form>
                    <p>dont have an account?</p><button onClick={() => navigate("/signup")}>Sign up here.</button>
                
            </div>
        </div>
    );
}