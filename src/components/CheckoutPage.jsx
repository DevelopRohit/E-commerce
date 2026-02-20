// src/components/CheckoutPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutPage.module.css";

const CheckoutPage = ({ cart }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProceed = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all details");
      return;
    }

    navigate("/payment", {
      state: { form, cart, total },
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>Checkout</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
        />

        <h3>Total: ₹{total}</h3>

        <button
          type="button"
          className={styles.orderBtn}
          onClick={handleProceed}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;