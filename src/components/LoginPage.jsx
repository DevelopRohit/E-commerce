import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ================= EMAIL LOGIN ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account Created Successfully");
      }

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Login Successful");
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{isLogin ? "Sign In" : "Create Account"}</h2>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className={styles.primaryBtn}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className={styles.divider}>OR</div>

        <button
          className={styles.googleBtn}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        <p className={styles.switchText}>
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
