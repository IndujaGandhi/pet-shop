import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { productService, categoryService } from '../services';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import Notification from '../components/Notification';
import { useCart } from '../context/CartContext';
import '../assets/styles/products.css';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    sort: 'latest',
    page: 1,
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {
          ...(filters.category && { category: filters.category }),
          ...(filters.search && { search: filters.search }),
          ...(filters.priceMin && { priceMin: filters.priceMin }),
          ...(filters.priceMax && { priceMax: filters.priceMax }),
          page: filters.page,
          limit: 12,
        };

        const response = await productService.getProducts(params);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setNotification({
          type: 'error',
          message: 'Failed to load products',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

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
    <div className="products-page">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="products-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <h3>Filters</h3>

          {/* Search */}
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="filter-input"
            />
          </div>

          {/* Categories */}
          <div className="filter-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                className="filter-input"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceMax}
                onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                className="filter-input"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="filter-select"
            >
              <option value="latest">Latest</option>
              <option value="-price">Price: High to Low</option>
              <option value="price">Price: Low to High</option>
              <option value="-rating">Rating: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="products-main">
          <div className="products-header">
            <h2>Products</h2>
            <p className="products-count">{products.length} products found</p>
          </div>

          {loading ? (
            <Loading message="Loading products..." />
          ) : products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found. Try adjusting your filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
