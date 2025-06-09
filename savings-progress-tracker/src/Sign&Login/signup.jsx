import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let userName = document.getElementById("userName");
        let userNamevalue = userName.value
        let email = document.getElementById("email");
        let emailvalue = email.value
        let password = document.getElementById("password");
        let passwordvalue = password.value
        let passConfirm = document.getElementById("passConfirm");
        let passConfirmvalue = passConfirm.value

        if (passwordvalue != passConfirmvalue) {
            alert("Password not the same")
        } else {
            
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, emailvalue, passwordvalue)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            navigate("/login")
            alert("Sign up sucessfull!")
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

        }
    
    
    }

    
    //HTML

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Create account</label>
                    <div>
                    <label>UserName:</label>
                    <input id="userName" required></input>
                    </div>
                    <div>
                    <label>Email:</label>
                    <input id="email"type="email" required></input>
                    </div>
                    <div>
                    <label>PassWord:</label>
                    <input id="password"type="password" required></input>
                    </div>
                    <div>
                    <label>Confirm password:</label>
                    <input id="passConfirm" type="password" required></input>
                    </div>
                    <button type="submit">Create Account</button>
                </form>
                    <p>Already have an account?</p> <button onClick={() => navigate("/login")}>To Login</button>
                
            </div>
        </div>
    )
}