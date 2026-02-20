const CartPopup = ({
  cart,
  closeCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  openCheckout,
}) => {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div onClick={closeCart}>
      <div onClick={(e) => e.stopPropagation()}>
        <h2>Your Cart</h2>

        {cart.map((item) => (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <p>₹{item.price}</p>
            <button onClick={() => decreaseQty(item.id)}>-</button>
            {item.qty}
            <button onClick={() => increaseQty(item.id)}>+</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}

        <h3>Total ₹{total}</h3>
        <button onClick={openCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartPopup;
