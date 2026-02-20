const Filters = ({ setBrand, setType }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <select onChange={(e) => setBrand(e.target.value)}>
        <option value="">All Brands</option>
        <option>Nike</option>
        <option>Adidas</option>
        <option>ZARA</option>
        <option>Levi's</option>
      </select>

      <select onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        <option>T-Shirt</option>
        <option>Shirt</option>
        <option>Jeans</option>
      </select>
    </div>
  );
};

export default Filters;
