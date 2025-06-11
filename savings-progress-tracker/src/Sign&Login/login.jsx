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
                    <h2>Login to Your Account</h2><br/>

                    <label>Email</label><br/>
                    <input id="email" type="email"></input><br/>

                    <label>Password</label><br/>
                    <input id="password" type="password"></input><br/>

                    <button className="log-button1" type="submit">Login</button><br/>
                </form>
                    <p>dont have an account?</p><button className="log-button2" onClick={() => navigate("/signup")}>Sign up here</button>
                
            </div>
        </div>
    );
}