// src/components/FeedbackPage.jsx
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import styles from "./FeedbackPage.module.css";

const FeedbackPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message || !form.rating) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "feedback"), {
        name: form.name,
        email: form.email,
        message: form.message,
        rating: form.rating,
        createdAt: new Date(),
      });

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        message: "",
        rating: "",
      });
    } catch (error) {
      console.error("Feedback Error:", error);
      alert("Submission failed. Check Firestore rules.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>Feedback Form</h2>

        {success && (
          <div className={styles.success}>
            🎉 Feedback submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
          />

          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
          >
            <option value="">Select Rating</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>

          <textarea
            name="message"
            placeholder="Write your feedback..."
            value={form.message}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;