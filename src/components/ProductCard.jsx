// src/components/ProductCard.jsx
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./ProductCard.module.css"; // ✅ Correct Import

const ProductCard = ({ product, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState("");

  const handleAdd = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart(product, selectedSize);
    setSelectedSize("");
  };

  return (
    <div className={styles.productCard}>
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name || product.title}
          className={styles.productImage}
        />
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        {/* TITLE */}
        <h3 className={styles.title}>
          {product.name || product.title || "Product Name"}
        </h3>

        {/* CAPTION */}
        <p className={styles.caption}>
          {product.caption || product.brand || "Premium Collection"}
        </p>

        {/* RATING */}
        <div className={styles.ratingBox}>
          <FaStar className={styles.star} />
          <span>{product.rating || 4.0}</span>
        </div>

        {/* PRICE */}
        <p className={styles.price}>₹{product.price}</p>

        {/* SIZE */}
        <div className={styles.sizeBox}>
          {["S", "M", "L"].map((size) => (
            <button
              key={size}
              className={`${styles.sizeBtn} ${
                selectedSize === size ? styles.activeSize : ""
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* BUTTON */}
        <button className={styles.addBtn} onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;