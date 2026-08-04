import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../services';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import Notification from '../components/Notification';
import { useCart } from '../context/CartContext';
import '../assets/styles/homepage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getFeaturedProducts();
        setFeaturedProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setNotification({
          type: 'error',
          message: 'Failed to load featured products',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.discountPrice > 0 ? product.discountPrice : product.price,
      image: product.image,
    });
    setNotification({
      type: 'success',
      message: `${product.name} added to cart!`,
    });
  };

  return (
    <div className="homepage">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Hero Banner with Video */}
      <section className="hero-banner">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="https://cdn.pixabay.com/video/2021/11/24/98815-650523108_large.mp4" type="video/mp4" />
          <source src="https://cdn.pixabay.com/video/2020/07/30/45934-447087537_large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Virtual Pet Shop</h1>
          <p className="hero-subtitle">Everything your pets need, delivered to your door</p>
          <Link to="/products" className="hero-btn hero-btn-animated">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <Link to="/products?category=dogs" className="category-card">
            <span className="category-icon">🐕</span>
            <h3>Dogs</h3>
          </Link>
          <Link to="/products?category=cats" className="category-card">
            <span className="category-icon">🐱</span>
            <h3>Cats</h3>
          </Link>
          <Link to="/products?category=birds" className="category-card">
            <span className="category-icon">🦜</span>
            <h3>Birds</h3>
          </Link>
          <Link to="/products?category=fish" className="category-card">
            <span className="category-icon">🐠</span>
            <h3>Fish</h3>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2>Featured Products</h2>
        {loading ? (
          <Loading message="Loading featured products..." />
        ) : featuredProducts.length > 0 ? (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <p className="no-products">No featured products available</p>
        )}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <span className="feature-icon">🚚</span>
          <h3>Fast Delivery</h3>
          <p>Get your pet supplies delivered quickly</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">✓</span>
          <h3>Quality Guaranteed</h3>
          <p>All products are verified and authentic</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">💰</span>
          <h3>Best Prices</h3>
          <p>Competitive pricing on all products</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🛡️</span>
          <h3>Secure Payment</h3>
          <p>Safe and secure checkout process</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
