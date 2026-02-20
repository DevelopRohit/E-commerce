import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <div>
      <h2>Admin Orders</h2>
      {orders.map((o) => (
        <div key={o.id}>
          <p>Status: {o.status}</p>
          <p>Total: ₹{o.total}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
