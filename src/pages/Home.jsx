import { useState } from "react";
import products from "../data/productData";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import styles from "./Home.module.css";

const Home = () => {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Hero />
      <input
        className={styles.search}
        placeholder="Search brand or product..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.grid}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
};

export default Home;
