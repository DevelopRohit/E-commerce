import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyDAkKUlOusl2RWIotEGIC1V9cJ9f7urgLg",
  authDomain: "react-ecommerce-ee862.firebaseapp.com",
  projectId: "react-ecommerce-ee862",
  storageBucket: "react-ecommerce-ee862.firebasestorage.app",
  messagingSenderId: "29454233268",
  appId: "1:29454233268:web:59f0fd25a32d9009fcf1e1",
  measurementId: "G-QW125RMFQF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app);