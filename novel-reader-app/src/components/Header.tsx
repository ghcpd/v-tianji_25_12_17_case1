import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
      <nav>
        <Link to="/" style={{ marginRight: '1rem', textDecoration: location.pathname === '/' ? 'underline' : 'none' }}>Browse</Link>
        <Link to="/bookshelf" style={{ marginRight: '1rem', textDecoration: location.pathname === '/bookshelf' ? 'underline' : 'none' }}>Bookshelf</Link>
        <Link to="/bookmarks" style={{ textDecoration: location.pathname === '/bookmarks' ? 'underline' : 'none' }}>Bookmarks</Link>
      </nav>
    </header>
  );
};

export default Header;