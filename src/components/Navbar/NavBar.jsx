import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';

function Navbar({onOpen}) {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate('/login');
  };

  return (
    <div className="navbar-container">
      <div className="navbar-start-section">
        <Link to="/home" className="navbar-title">Donors</Link>
      </div>
      
      {user?.id ? (
        // Authenticated user view
        <>
          <div className="navbar-center-section">
            <div className="search-control">
              <input type="text" placeholder="Search" className="search-input" />
            </div>
          </div>
          <div className="navbar-end-section">
            <button className="add-donor-button" onClick={onOpen}>Add a Donor</button>
            <Link to="/about" className="nav-link">About</Link>
            <button className="nav-link logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        // Non-authenticated user view
        <div className="navbar-end-section">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/registration" className="nav-link">Register</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
