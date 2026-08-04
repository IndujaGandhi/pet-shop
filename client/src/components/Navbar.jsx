import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../assets/styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { cartItemsCount } = useCart();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pet Shop logo">
              <rect x="10" y="28" width="70" height="34" rx="8" fill="#F7F7F7" stroke="#262626" stroke-width="4" />
              <path d="M10 28l12-16h46l12 16" fill="#F7D96F" stroke="#262626" stroke-width="4" />
              <rect x="18" y="38" width="22" height="18" rx="4" fill="#8CCBF7" stroke="#262626" stroke-width="3" />
              <rect x="50" y="38" width="22" height="18" rx="4" fill="#8CCBF7" stroke="#262626" stroke-width="3" />
              <path d="M30 56h8" stroke="#262626" stroke-width="3" stroke-linecap="round" />
              <path d="M62 56h8" stroke="#262626" stroke-width="3" stroke-linecap="round" />
              <circle cx="45" cy="20" r="14" fill="#F7D96F" stroke="#262626" stroke-width="4" />
              <path d="M45 18c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z" fill="#5B3A29" />
              <circle cx="39" cy="12" r="3" fill="#5B3A29" />
              <circle cx="51" cy="12" r="3" fill="#5B3A29" />
              <circle cx="45" cy="8" r="3.2" fill="#5B3A29" />
              <path d="M38 23c1.5 2.5 4.5 3.5 7 3.5s5.5-1 7-3.5" stroke="#5B3A29" stroke-width="3" fill="none" stroke-linecap="round" />
            </svg>
          </span>
          Pet Shop
        </Link>

        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for pets, toys, food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>

        {/* Nav Links */}
        <div className="navbar-menu">
          <Link to="/products" className="nav-link">
            Shop
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="nav-link cart-link">
            <span className="cart-icon">🛒</span>
            {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
          </Link>

          {/* Auth Links */}
          {isAuthenticated ? (
            <div className="user-menu">
              <button
                className="user-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                👤 {user?.firstName}
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item">
                    My Orders
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="dropdown-item">
                      Admin Panel
                    </Link>
                  )}
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link btn-register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
