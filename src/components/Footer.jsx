import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* BRAND */}
        <div className={styles.col}>
          <h3>🛍️ MyStore</h3>
          <p>
            Your one-stop shop for fashion, lifestyle and daily
            essentials.
          </p>
        </div>

        {/* LINKS */}
        <div className={styles.col}>
          <h4>Quick Links</h4>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/cart")}>Cart</li>
            <li onClick={() => navigate("/feedback")}>
              Feedback
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className={styles.col}>
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Returns</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div className={styles.col}>
          <h4>Follow Us</h4>
          <div className={styles.social}>
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaGithub />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
