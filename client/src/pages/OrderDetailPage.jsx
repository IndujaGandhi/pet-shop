import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderService } from '../services';
import Loading from '../components/Loading';
import Notification from '../components/Notification';
import '../assets/styles/orderdetail.css';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await orderService.getOrderById(id);
        setOrder(response.data.order);
      } catch (error) {
        console.error('Error fetching order:', error);
        setNotification({
          type: 'error',
          message: 'Failed to load order details',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffc107',
      processing: '#17a2b8',
      shipped: '#0099ff',
      delivered: '#28a745',
      cancelled: '#dc3545',
    };
    return colors[status] || '#999';
  };

  if (loading) {
    return <Loading message="Loading order details..." />;
  }

  if (!order) {
    return <div className="order-error">Order not found</div>;
  }

  const totalAmount = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="order-detail">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="order-detail-container">
        {/* Order Header */}
        <div className="order-header-section">
          <h1>Order Details</h1>
          <div className="order-meta">
            <div className="meta-item">
              <span className="label">Order Number:</span>
              <span className="value">{order.orderNumber}</span>
            </div>
            <div className="meta-item">
              <span className="label">Order Date:</span>
              <span className="value">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="meta-item">
              <span className="label">Status:</span>
              <span
                className="status-badge"
                style={{ backgroundColor: getStatusColor(order.orderStatus) }}
              >
                {order.orderStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="order-content">
          {/* Order Items */}
          <div className="order-items-section">
            <h2>Order Items</h2>
            <div className="items-list">
              {order.items.map((item) => (
                <div key={item.product._id} className="order-item-detail">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="shipping-section">
            <h2>Shipping Address</h2>
            <div className="address-info">
              <p>
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p>{order.shippingAddress.phone}</p>
            </div>

            {order.trackingNumber && (
              <div className="tracking-info">
                <h3>Tracking Number</h3>
                <p className="tracking-number">{order.trackingNumber}</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="order-summary-detail">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping Cost:</span>
              <span>${order.shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Tax:</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="divider"></div>
            <div className="summary-item total">
              <span>Total Amount:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment & Status Info */}
        <div className="status-info">
          <div className="info-card">
            <h3>Payment Information</h3>
            <p>
              <strong>Method:</strong> {order.paymentMethod.replace('_', ' ').toUpperCase()}
            </p>
            <p>
              <strong>Status:</strong>
              <span className={`payment-status ${order.paymentStatus}`}>
                {order.paymentStatus}
              </span>
            </p>
          </div>

          <div className="info-card">
            <h3>Delivery Status</h3>
            <div className="status-timeline">
              <div className={`status-step ${order.orderStatus === 'pending' ? 'active' : 'completed'}`}>
                <span className="step-number">1</span>
                <span className="step-name">Pending</span>
              </div>
              <div className={`status-step ${order.orderStatus === 'processing' ? 'active' : order.orderStatus !== 'pending' ? 'completed' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-name">Processing</span>
              </div>
              <div className={`status-step ${order.orderStatus === 'shipped' ? 'active' : order.orderStatus === 'delivered' ? 'completed' : ''}`}>
                <span className="step-number">3</span>
                <span className="step-name">Shipped</span>
              </div>
              <div className={`status-step ${order.orderStatus === 'delivered' ? 'active' : ''}`}>
                <span className="step-number">4</span>
                <span className="step-name">Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
