import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Link,
  useNavigate
} from "react-router-dom";
import useStore from '../../zustand/store';
import Navbar from '../Navbar/NavBar';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import SuccessPage from '../SuccessPage/SuccessPage';
import './App.css';

function App() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);
  const logOut = useStore((state) => state.logOut);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">DonorHub</h1>
          <nav className="main-nav">
            <Link to="/about" className="nav-link">About</Link>
            {user?.id ? (
              <button 
                className="nav-link logout-button"
                onClick={async () => {
                  await logOut();
                  navigate('/logout-success');
                }}
              >
                Logout
              </button>
    
            ) : (
    
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/registration" className="nav-link">Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route
            exact path="/"
            element={
              user.id ? (
                <HomePage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            exact path="/login"
            element={
              user.id ? (
                <Navigate to="/login-success" replace />
              ) : (
                <LoginPage />
              )
            }
          />

          <Route
            exact path="/login-success"
            element={
              <SuccessPage 
                message="Successfully logged in!" 
                redirectTo="/"
                delay={1500}
              />
            }
          />

           <Route
            exact path="/logout-success"
            element={
              <SuccessPage 
                message="Successfully logged out!" 
                redirectTo="/login"
                delay={1500}
              />
            }
          /> 

          <Route
            exact path="/registration"
            element={
              user.id ? (
                <Navigate to="/login-success" replace />
              ) : (
                <RegisterPage />
              )
            }
          />

          <Route
            exact path="/about"
            element={
              <div className="about-container">
                <h2 className="about-title">About Page</h2>
                
             
                <p className="about-quote">
                  
Thank you for Listening and watching my presentation. The technologies I used were React, Node.js, Express, Tailwind CSS and PostgreSQL to build this app.
                </p>
               
                {user?.id && (
                  <Link to="/" className="back-to-donors-button">
                    Back to Donor List
                  </Link>
                )}
              </div>
            }
          />


          <Route
            path="*"
            element={
              <h2 className="error-page">404 Page</h2>
            }
          />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>Copyright © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;