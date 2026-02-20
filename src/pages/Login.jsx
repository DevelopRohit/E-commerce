// src/components/LoginPage.jsx
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ================= EMAIL LOGIN ================= */
  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Login Successful!");
      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/popup-closed-by-user") {
        alert("Popup closed");
      } else if (error.code === "auth/cancelled-popup-request") {
        alert("Popup already open");
      } else if (error.code === "auth/unauthorized-domain") {
        alert("Domain not authorized in Firebase");
      } else {
        alert("Google login failed");
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <h2>Sign In</h2>

        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>

        <div className={styles.divider}>OR</div>

        <button
          className={styles.googleBtn}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        <button
          className={styles.closeBtn}
          onClick={() => navigate("/")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPage;