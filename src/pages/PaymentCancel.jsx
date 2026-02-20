import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

const PaymentCancel = async () => {
  await addDoc(collection(db, "orders"), {
    status: "failed",
    paymentMode: "Stripe",
    createdAt: Timestamp.now(),
  });

  return <h2>Payment Cancelled ❌</h2>;
};

export default PaymentCancel;
