// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import PaymentPage from "./components/PaymentPage";
import OrderHistory from "./components/OrderHistory";
import FeedbackPage from "./components/Feedback.Page";
import AuthModal from "./components/AuthModal";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const navigate = useNavigate();
  /* ================= SEARCH ================= */
  const handleSearch = (query) => {
    if (!query || !query.trim()) {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter((item) =>
      (
        (item.title || "") +
        " " +
        (item.name || "") +
        " " +
        (item.brand || "") +
        " " +
        (item.caption || "")
      )
        .toLowerCase()
        .includes(query.toLowerCase()),
    );

    setProducts(filtered);
  };
  /* ================= STATE ================= */
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  /* ================= AUTH ================= */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(list);
        setAllProducts(list);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  /* ================= CATEGORY FILTER (🔥 FIX ADDED) ================= */
  const handleCategoryChange = (category) => {
    navigate("/");

    if (category === "all") {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter(
      (item) =>
        item.category &&
        item.category.toLowerCase().trim() === category.toLowerCase().trim(),
    );

    setProducts(filtered);
  };

  /* ================= ADD TO CART ================= */
  const addToCart = (product, size) => {
    if (!size) {
      alert("Please select size");
      return;
    }

    const exists = cart.find(
      (item) => item.id === product.id && item.size === size,
    );

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, size, qty: 1 }]);
    }
  };

  /* ================= INCREASE ================= */
  const increaseQty = (id, size) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, qty: item.qty + 1 }
          : item,
      ),
    );
  };

  /* ================= DECREASE ================= */
  const decreaseQty = (id, size) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, qty: item.qty - 1 }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  /* ================= REMOVE ================= */
  const removeFromCart = (id, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.size === size)),
    );
  };
  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Navbar
        onCategoryChange={handleCategoryChange}
        cartCount={cart.reduce((sum, i) => sum + i.qty, 0)}
        user={user}
        logout={logout}
        openAuth={() => setShowAuth(true)}
      />

      {showAuth && <AuthModal close={() => setShowAuth(false)} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero onSearch={handleSearch} />
              <div className="productsGrid">
                {products.length === 0 ? (
                  <h2 style={{ padding: "40px" }}>No products found</h2>
                ) : (
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      addToCart={addToCart}
                    />
                  ))
                )}
              </div>
            </>
          }
        />{" "}
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeFromCart={removeFromCart}
              goCheckout={() => navigate("/checkout")}
            />
          }
        />
        <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
        <Route
          path="/payment"
          element={<PaymentPage clearCart={clearCart} />}
        />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/login" element={<LoginPage />} />X
      </Routes>

      <Footer />
    </>
  );
}

export default App;
