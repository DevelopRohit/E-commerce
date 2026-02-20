// src/components/Hero.jsx
import { useState } from "react";
import styles from "./Hero.module.css";

const Hero = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className={styles.hero}>
      <h1>Discover Your Style</h1>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleSubmit()
          }
        />

        <button onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Hero;