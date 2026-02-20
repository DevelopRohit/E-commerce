// src/components/CartPage.jsx
import "./CartPage.css";

const CartPage = ({
  cart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  goCheckout,
}) => {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cartContainer">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty">Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id + item.size}
              className="cartItem"
            >
              <img
                src={item.image}
                alt={item.title || item.name}
              />

              <div className="cartInfo">
                <h4>{item.title || item.name}</h4>
                <p>Size: {item.size}</p>
                <p>₹{item.price}</p>

                <div className="qtyBox">
                  <button
                    onClick={() =>
                      decreaseQty(item.id, item.size)
                    }
                  >
                    −
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() =>
                      increaseQty(item.id, item.size)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="removeBtn"
                  onClick={() =>
                    removeFromCart(item.id, item.size)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="checkoutBox">
            <h3>Total: ₹{total}</h3>

            <button
              className="checkoutBtn"
              onClick={goCheckout}
            >
              Process to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;