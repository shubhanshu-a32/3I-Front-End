import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>3I Platform</h3>
            <p>Share your ideas, innovations, and make your identity with the world.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: osmwow17@gmail.com</p>
            <p>Phone: (+91) 630720XXXX </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} 3I Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;