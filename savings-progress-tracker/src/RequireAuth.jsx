// RequireAuth.jsx
import React from "react"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth"; // or custom hook
import { auth } from "./firebase"; // your firebase setup

function RequireAuth({ children }) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login"); // Not logged in → redirect
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>; // While checking

  return user ? children : null; // Show protected content if logged in
}

export default RequireAuth;
