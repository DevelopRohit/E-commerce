import { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

const PaymentSuccess = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  useEffect(() => {
    const saveOrder = async () => {
      await addDoc(collection(db, "orders"), {
        items: cart,
        total: totalPrice,
        status: "paid",
        paymentMode: "Stripe",
        createdAt: Timestamp.now(),
      });
      clearCart();
    };
    saveOrder();
  }, []);

  return <h2>Payment Successful 🎉</h2>;
};

export default PaymentSuccess;
