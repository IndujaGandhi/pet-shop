import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Notification from '../components/Notification';
import { formatCurrency, productImageFallback } from '../utils/formatters';
import '../assets/styles/cart.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [notification, setNotification] = React.useState(null);

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setNotification({
      type: 'success',
      message: 'Item removed from cart',
    });
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Calculate additional fees
  const shippingCost = 50;
  const tax = cartTotal * 0.1;
  const total = cartTotal + shippingCost + tax;

  return (
    <div className="cart-page">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <h1>Shopping Cart</h1>

      <div className="cart-container">
        {/* Cart Items */}
        <div className="cart-items-section">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.productId} className="cart-item-row">
                  <td className="product-column">
                    <img
                      src={item.image || productImageFallback(item.name)}
                      alt={item.name}
                      className="cart-product-image"
                      onError={(e) => {
                        e.target.src = productImageFallback(item.name);
                      }}
                    />
                    <span className="product-name">{item.name}</span>
                  </td>
                  <td className="price-column">{formatCurrency(item.price)}</td>
                  <td className="quantity-column">
                    <div className="quantity-control">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.productId, e.target.value)
                        }
                        min="1"
                      />
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="total-column">
                    {formatCurrency(item.price * item.quantity)}
                  </td>
                  <td className="action-column">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.productId)}
                      title="Remove from cart"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-actions">
            <Link to="/products" className="continue-shopping-link">
              ← Continue Shopping
            </Link>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping:</span>
            <span>{formatCurrency(shippingCost)}</span>
          </div>

          <div className="summary-row">
            <span>Tax (10%):</span>
            <span>{formatCurrency(tax)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>

          <div className="payment-methods">
            <p>We accept:</p>
            <div className="methods">
              <span>💳 Credit Card</span>
              <span>🏦 Bank Transfer</span>
              <span>💰 PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
