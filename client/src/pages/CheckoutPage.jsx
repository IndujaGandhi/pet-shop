import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import Notification from '../components/Notification';
import '../assets/styles/checkout.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [currentStep, setCurrentStep] = useState('shipping');

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || '',
    paymentMethod: 'credit_card',
    sameAsBilling: true,
  });

  if (items.length === 0) {
    return (
      <div className="empty-checkout">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add items to your cart before checking out.</p>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          ✓ Continue Shopping
        </button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-required">
        <div className="auth-icon">🔐</div>
        <h2>Login Required</h2>
        <p>Please login to proceed with checkout.</p>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>
          Login to Continue
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      sameAsBilling: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.street ||
      !formData.city ||
      !formData.zipCode
    ) {
      setNotification({
        type: 'error',
        message: 'Please fill in all required fields',
      });
      return;
    }

    try {
      setLoading(true);

      // Prepare order data
      const orderData = {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone,
        },
        billingAddress: formData.sameAsBilling
          ? {
              firstName: formData.firstName,
              lastName: formData.lastName,
              street: formData.street,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              country: formData.country,
              phone: formData.phone,
            }
          : null,
        paymentMethod: formData.paymentMethod,
      };

      const response = await orderService.createOrder(orderData);

      if (response.data.success) {
        setNotification({
          type: 'success',
          message: 'Order placed successfully!',
        });

        // Clear cart and redirect
        clearCart();
        setTimeout(() => {
          navigate(`/order/${response.data.order._id}`);
        }, 1500);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setNotification({
        type: 'error',
        message:
          error.response?.data?.message ||
          'Failed to place order. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const shippingCost = 50;
  const tax = cartTotal * 0.1;
  const total = cartTotal + shippingCost + tax;

  return (
    <div className="checkout-page">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="checkout-header">
        <h1>Complete Your Order</h1>
        <p className="checkout-subtitle">Secure checkout with your information</p>
      </div>

      {/* Progress Steps */}
      <div className="checkout-progress">
        <div className={`progress-step ${currentStep === 'shipping' ? 'active' : currentStep === 'payment' || currentStep === 'review' ? 'completed' : ''}`}>
          <div className="step-circle">1</div>
          <span className="step-label">Shipping</span>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep === 'payment' ? 'active' : currentStep === 'review' ? 'completed' : ''}`}>
          <div className="step-circle">2</div>
          <span className="step-label">Payment</span>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep === 'review' ? 'active' : ''}`}>
          <div className="step-circle">3</div>
          <span className="step-label">Review</span>
        </div>
      </div>

      <div className="checkout-container">
        {/* Checkout Form */}
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form">
            {/* Shipping Address */}
            <div className="form-section">
              <h3>Shipping Address</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={handleInputChange}
                  />
                  <span>Credit Card</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="debit_card"
                    checked={formData.paymentMethod === 'debit_card'}
                    onChange={handleInputChange}
                  />
                  <span>Debit Card</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={handleInputChange}
                  />
                  <span>Bank Transfer</span>
                </label>
              </div>
            </div>

            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="order-summary-section">
          <h3>Order Summary</h3>

          <div className="order-items">
            {items.map((item) => (
              <div key={item.productId} className="order-item">
                <div className="item-info">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-qty">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-line">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping:</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-line total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
