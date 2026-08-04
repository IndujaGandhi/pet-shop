import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🐾 Virtual Pet Shop</h3>
          <p>Your one-stop destination for all pet supplies and accessories. Trusted by pet lovers worldwide.</p>
          <div className="social-links">
            <a href="https://www.facebook.com" className="social-link" title="Facebook" aria-label="Facebook" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12.07c0-5.58-4.48-10.07-10.06-10.07S1.88 6.49 1.88 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03h-2.54v-2.9h2.54V9.41c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34v7.03c4.78-.8 8.44-4.94 8.44-9.93z" />
              </svg>
            </a>
            <a href="https://www.x.com" className="social-link" title="X" aria-label="X" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.53 8.53 0 0 1-2.72 1.04 4.26 4.26 0 0 0-7.26 3.88A12.08 12.08 0 0 1 3.1 4.9a4.24 4.24 0 0 0 1.32 5.7 4.2 4.2 0 0 1-1.93-.53v.05a4.26 4.26 0 0 0 3.42 4.18 4.3 4.3 0 0 1-1.92.07 4.26 4.26 0 0 0 3.98 2.97A8.53 8.53 0 0 1 2 19.54a12.04 12.04 0 0 0 6.54 1.92c7.85 0 12.14-6.5 12.14-12.14 0-.18-.01-.35-.02-.53A8.7 8.7 0 0 0 22.46 6z" />
              </svg>
            </a>
            <a href="https://www.instagram.com" className="social-link" title="Instagram" aria-label="Instagram" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.51 4.51 0 0 0 12 7.5zm0 7.5A3 3 0 1 1 15 12a3 3 0 0 1-3 3zm4.8-7.9a1.08 1.08 0 1 1-1.08-1.08A1.08 1.08 0 0 1 16.8 3.1z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>📍 Quick Links</h4>
          <ul>
            <li><Link to="/products">🛍️ Shop</Link></li>
            <li><Link to="/categories">🏷️ Categories</Link></li>
            <li><Link to="/about">ℹ️ About Us</Link></li>
            <li><Link to="/contact">💬 Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>🤝 Support</h4>
          <ul>
            <li><a href="#contact">📞 Contact Us</a></li>
            <li><a href="#faq">❓ FAQ</a></li>
            <li><a href="#returns">↩️ Returns</a></li>
            <li><a href="#shipping">🚚 Shipping Info</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>⚖️ Legal</h4>
          <ul>
            <li><a href="#privacy">🔒 Privacy Policy</a></li>
            <li><a href="#terms">📋 Terms of Service</a></li>
            <li><a href="#cookie">🍪 Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>2026 Virtual Pet Shop. All rights reserved. Made with ❤️ for pet lovers.</p>
      </div>
    </footer>
  );
};

export default Footer;
