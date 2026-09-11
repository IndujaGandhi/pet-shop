import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services';
import Loading from '../components/Loading';
import Notification from '../components/Notification';
import { formatCurrency } from '../utils/formatters';
import '../assets/styles/orders.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getUserOrders();
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setNotification({
          type: 'error',
          message: 'Failed to load orders',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusClass = `status-${status}`;
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  if (loading) {
    return <Loading message="Loading orders..." />;
  }

  return (
    <div className="orders-page">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/products" className="shop-btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.orderNumber}</h3>
                  <p className="order-date">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="order-status">
                  {getStatusBadge(order.orderStatus)}
                </div>
              </div>

              <div className="order-items-summary">
                <p className="items-count">{order.items.length} items</p>
                {order.items.slice(0, 2).map((item, idx) => (
                  <p key={idx} className="item-preview">
                    {item.name} x{item.quantity}
                  </p>
                ))}
                {order.items.length > 2 && (
                  <p className="more-items">+{order.items.length - 2} more</p>
                )}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <p>Total: <strong>{formatCurrency(order.total)}</strong></p>
                </div>
                <Link to={`/order/${order._id}`} className="view-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
