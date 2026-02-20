// src/components/PaymentPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import styles from "./PaymentPage.module.css";

const PaymentPage = ({ clearCart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  // If somehow no data passed, show fallback
  if (!data) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        No order data
      </h2>
    );
  }

  const [isPopup, setIsPopup] = useState(false); // modal visibility
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Save order to Firestore
      await addDoc(collection(db, "orders"), {
        customerName: data.form.name,
        email: data.form.email,
        phone: data.form.phone,
        address: data.form.address,
        items: data.cart,
        totalAmount: data.total,
        paymentStatus: "Paid",
        orderDate: new Date().toLocaleString(),
      });

      // Clear cart so icon count decreases
      if (clearCart) clearCart();

      // Show popup
      setIsPopup(true);
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setIsPopup(false);
    navigate("/"); // go home after closing modal
  };

  return (
    <>
      {/* Main payment UI */}
      <div className={styles.container}>
        <div className={styles.paymentCard}>
          <h2>Payment</h2>

          <div className={styles.summaryBox}>
            {data.cart.map((item) => (
              <div key={item.id + item.size}>
                {item.title} ({item.size}) × {item.qty}
              </div>
            ))}
          </div>

          <h3>Total: ₹{data.total}</h3>

          <button
            className={styles.payBtn}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupCard}>
            <h2>🎉 Payment Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <button onClick={closePopup} className={styles.popupBtn}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;