import React from 'react';
import { Button } from 'react-bootstrap';
import './Navbar.css';

function AppNavbar() {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username') || 'Habit Hacker';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/signin'; // better than reload
  };

  return (
    <nav className="app-navbar">
      <div className="navbar-brand">
        <span className="logo">🌿 HabitFlow</span>
      </div>

      {token && (
        <div className="navbar-user-actions">
          <span className="username">👤 {username}</span>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}

export default AppNavbar;
