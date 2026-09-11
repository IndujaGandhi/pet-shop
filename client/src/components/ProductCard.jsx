import React from 'react';
import '../assets/styles/productcard.css';
import { Link } from 'react-router-dom';
import { formatCurrency, productImageFallback } from '../utils/formatters';

const ProductCard = ({ product, onAddToCart }) => {
  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const currentPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

  return (
    <div className="product-card">
      {discountPercent > 0 && (
        <div className="discount-badge">{discountPercent}% OFF</div>
      )}

      <Link to={`/product/${product._id}`} className="product-image-link">
        <img
          src={product.image || productImageFallback(product.name)}
          alt={product.name}
          className="product-image"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src = productImageFallback(product.name);
          }}
        />
      </Link>

      <div className="product-info">
        <Link to={`/product/${product._id}`} className="product-name">
          {product.name}
        </Link>

        <div className="product-rating">
          {'⭐'.repeat(Math.round(product.rating || 0))}
          <span className="rating-value">({product.numberOfReviews} reviews)</span>
        </div>

        <div className="product-price">
          <span className="current-price">{formatCurrency(currentPrice)}</span>
          {discountPercent > 0 && (
            <span className="original-price">{formatCurrency(product.price)}</span>
          )}
        </div>

        <div className="product-stock">
          {product.stock > 0 ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>

        <button
          className="add-to-cart-btn"
          disabled={product.stock === 0}
          onClick={() => onAddToCart(product)}
        >
          {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
