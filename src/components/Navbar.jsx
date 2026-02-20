// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ({
  onCategoryChange,
  cartCount,
  user,
  logout,
  openAuth,
}) => {
  const navigate = useNavigate();

  const handleCategory = (category) => {
    navigate("/");
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* LOGO */}
      <div
        className={styles.logo}
        onClick={() => handleCategory("all")}
      >
        MyStore
      </div>

      {/* CATEGORY LINKS */}
      <ul className={styles.navLinks}>
        <li onClick={() => handleCategory("all")}>Home</li>
        <li onClick={() => handleCategory("jeans")}>Jeans</li>
        <li onClick={() => handleCategory("t-shirt")}>T-Shirt</li>
        <li onClick={() => handleCategory("shirt")}>Shirt</li>
        <li onClick={() => navigate("/orders")}>Orders</li>
        <li onClick={() => navigate("/feedback")}>Feedback</li>
      </ul>

      {/* RIGHT SECTION */}
      <div className={styles.right}>
        {/* CART */}
        <button
          className={styles.cartBtn}
          onClick={() => navigate("/cart")}
        >
          🛒 {cartCount || 0}
        </button>

        {/* AUTH */}
        {user ? (
          <button
            className={styles.logoutBtn}
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <button
            className={styles.loginBtn}
            onClick={openAuth}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;