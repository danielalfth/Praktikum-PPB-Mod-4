import { useCart } from '../context/CartContext.jsx'

function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <section className="page">
        <h1 className="display">Shopping Cart</h1>
        <p className="empty-cart">Your cart is empty.</p>
      </section>
    )
  }

  return (
    <section className="page">
      <h1 className="display">Shopping Cart</h1>
      
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.name} className="cart-item">
            <img src={item.image} alt="" className="cart-item-img" />
            <div className="cart-item-info">
              <h3 className="cart-item-name display">{item.name}</h3>
              <p className="cart-item-meta">
                {item.type} · {item.caliber}
              </p>
              <p className="cart-item-price">${item.price.toLocaleString()}</p>
            </div>
            <div className="cart-item-controls">
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.name, item.quantity - 1)}
                  className="qty-btn"
                >
                  −
                </button>
                <span className="qty-display">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.name, item.quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
              <p className="cart-item-subtotal">
                ${(item.price * item.quantity).toLocaleString()}
              </p>
              <button
                onClick={() => removeFromCart(item.name)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span className="summary-label">Total:</span>
          <span className="summary-value">${totalPrice.toLocaleString()}</span>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </section>
  )
}

export default Cart
