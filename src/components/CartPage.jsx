import styles from "./CartPage.module.css";

const CartPage = ({
  cart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  goCheckout,
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className={styles.page}>
      {/* WORKFLOW */}
      <div className={styles.steps}>
        <span className={styles.active}>Cart</span>
        <span>Address</span>
        <span>Payment</span>
        <span>Done</span>
      </div>

      {cart.length === 0 ? (
        <p className={styles.empty}>🛒 Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} />

              <div className={styles.info}>
                <h4>{item.title}</h4>
                <p>₹{item.price}</p>

                <div className={styles.qty}>
                  <button onClick={() => decreaseQty(item.id)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <button
                  className={styles.remove}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className={styles.total}>Total: ₹{total}</div>

          <button className={styles.checkoutBtn} onClick={goCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
