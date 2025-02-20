import './NavBar.css';

function Navbar({onOpen}) {
  return (
    <div className="navbar-container">
      <div className="navbar-start-section">
        <a className="navbar-title">Donors</a>
      </div>
      <div className="navbar-center-section">
        <div className="search-control">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>
      <div className="navbar-end-section">
        <button className="add-donor-button" onClick={onOpen}>Add a Donor</button>
      </div>
    </div>
  );
}

export default Navbar;
