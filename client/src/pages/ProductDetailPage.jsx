import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services';
import Loading from '../components/Loading';
import Notification from '../components/Notification';
import { useCart } from '../context/CartContext';
import { formatCurrency, productImageFallback } from '../utils/formatters';
import '../assets/styles/productdetail.css';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const productResponse = await productService.getProductById(id);
        setProduct(productResponse.data.product);
        setSelectedImage(productResponse.data.product.image);

        const relatedResponse = await productService.getRelatedProducts(id);
        setRelatedProducts(relatedResponse.data.products);
      } catch (error) {
        console.error('Error fetching product:', error);
        setNotification({
          type: 'error',
          message: 'Failed to load product',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.discountPrice > 0 ? product.discountPrice : product.price,
        image: product.image,
        quantity: parseInt(quantity),
      });
      setNotification({
        type: 'success',
        message: `${product.name} added to cart!`,
      });
      setQuantity(1);
    }
  };

  if (loading) {
    return <Loading message="Loading product..." />;
  }

  if (!product) {
    return (
      <div className="product-error">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const currentPrice =
    product.discountPrice > 0 ? product.discountPrice : product.price;

  return (
    <div className="product-detail">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="product-detail-container">
        {/* Images Section */}
        <div className="product-images">
          <div className="main-image">
            <img
              src={selectedImage || productImageFallback(product.name)}
              alt={product.name}
              loading="eager"
              decoding="async"
              onError={(e) => {
                e.target.src = productImageFallback(product.name);
              }}
            />
            {discountPercent > 0 && (
              <div className="discount-badge">{discountPercent}% OFF</div>
            )}
          </div>
          {product.images && product.images.length > 0 && (
            <div className="thumbnail-images">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img || productImageFallback(product.name)}
                  alt={`${product.name} ${idx + 1}`}
                  onClick={() => setSelectedImage(img || productImageFallback(product.name))}
                  className={selectedImage === img ? 'active' : ''}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.src = productImageFallback(product.name);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="product-details">
          <div className="breadcrumb">
            <span onClick={() => navigate('/')}>Home</span> /
            <span onClick={() => navigate('/products')}>Products</span> /
            <span>{product.name}</span>
          </div>

          <h1 className="product-title">{product.name}</h1>

          {/* Rating */}
          <div className="product-rating">
            <span className="stars">
              {'⭐'.repeat(Math.round(product.rating || 0))}
            </span>
            <span className="rating-info">
              {product.rating || 0} / 5 ({product.numberOfReviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="product-pricing">
            <span className="current-price">{formatCurrency(currentPrice)}</span>
            {discountPercent > 0 && (
              <>
                <span className="original-price">{formatCurrency(product.price)}</span>
                <span className="discount-percent">Save {discountPercent}%</span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="stock-status">
            {product.stock > 0 ? (
              <>
                <span className="in-stock">✓ In Stock</span>
                <span className="stock-count">({product.stock} available)</span>
              </>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          {/* Description */}
          <div className="description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="specifications">
              <h3>Specifications</h3>
              <ul>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="product-actions">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={product.stock === 0}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1))
                    )
                  }
                  disabled={product.stock === 0}
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={product.stock === 0}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
            </button>

            <button className="wishlist-btn">♡ Add to Wishlist</button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>Related Products</h2>
          <div className="related-grid">
            {relatedProducts.map((related) => (
              <div
                key={related._id}
                className="related-card"
                onClick={() => navigate(`/product/${related._id}`)}
              >
                <img
                  src={related.image}
                  alt={related.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                  }}
                />
                <h4>{related.name}</h4>
                <p className="related-price">
                  {formatCurrency(
                    related.discountPrice > 0
                      ? related.discountPrice
                      : related.price
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
