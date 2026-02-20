// src/components/AuthModal.jsx
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import styles from "./AuthModal.module.css";

const AuthModal = ({ close }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* LOGIN */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      close();
    } catch (error) {
      alert(error.message);
    }
  };

  /* SIGNUP */
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created Successfully!");
      close();
    } catch (error) {
      alert(error.message);
    }
  };

  /* GOOGLE LOGIN */
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Login Successful!");
      close();
    } catch (error) {
      alert("Google login failed");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>

        <form onSubmit={isLogin ? handleLogin : handleSignup}>
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

          <button type="submit" className={styles.mainBtn}>
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className={styles.divider}>OR</div>

        <button
          className={styles.googleBtn}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        <p
          className={styles.toggle}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </p>

        <button className={styles.closeBtn} onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;