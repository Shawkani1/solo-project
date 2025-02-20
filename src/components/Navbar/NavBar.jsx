import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';
import { useState } from 'react';

function Navbar({onOpen, onSearch}) {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = async () => {
    await logOut();
    navigate('/logout-success');
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-start-section">
        <Link to="/home" className="navbar-title">Donors</Link>
        <Link to="/about" className="nav-link">About</Link>
      </div>
      
      {user?.id ? (
        // Authenticated user view
        <>
          <div className="navbar-center-section">
            <div className="search-control">
              <input 
                type="text" 
                placeholder="Search donors..." 
                className="search-input"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="navbar-end-section">
            <button className="add-donor-button" onClick={onOpen}>Add New</button>
            <button className="nav-link logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        // Non-authenticated user view
        <div className="navbar-end-section">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/registration" className="nav-link">Register</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
