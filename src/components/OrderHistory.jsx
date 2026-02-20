// src/components/OrderHistory.jsx
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import styles from "./OrderHistory.module.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          orderBy("orderDate", "desc")
        );

        const snapshot = await getDocs(q);

        const orderList = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* 🔥 REMOVE ORDER FUNCTION */
  const handleRemove = async (id) => {
    try {
      await deleteDoc(doc(db, "orders", id));

      // Remove from UI instantly
      setOrders((prev) =>
        prev.filter((order) => order.id !== id)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  if (loading)
    return <h2 className={styles.loading}>Loading Orders...</h2>;

  return (
    <div className={styles.container}>
      <h2>Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className={styles.card}>
            <div className={styles.header}>
              <span>
                <strong>Name:</strong> {order.customerName}
              </span>
              <span>
                <strong>Date:</strong> {order.orderDate}
              </span>
            </div>

            <div className={styles.items}>
              {order.items.map((item) => (
                <div
                  key={item.id + item.size}
                  className={styles.item}
                >
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <p>Size: {item.size}</p>
                    <p>Qty: {item.qty}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                Total: ₹{order.totalAmount}
              </div>

              <button
                className={styles.removeBtn}
                onClick={() => handleRemove(order.id)}
              >
                Remove Order
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;