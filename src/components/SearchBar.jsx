// src/components/SearchBar.jsx
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

const SearchBar = ({ data = [], onResult }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    onResult(filtered);
  };

  return (
    <div className={styles.searchBox}>
      <FaSearch className={styles.icon} />
      <input
        type="text"
        placeholder="Search products, courses, brands..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
