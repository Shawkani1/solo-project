import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter
} from "react-router-dom";
import useStore from '../../zustand/store';
import Navbar from '../Navbar/NavBar';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import './App.css';

function App() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">DonorHub</h1>
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
                <Navigate to="/" replace />
              ) : (
                <LoginPage />
              )
            }
          />

          <Route
            exact path="/registration"
            element={
              user.id ? (
                <Navigate to="/" replace />
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
                <p className="about-text">
                  Intelligence doesn't seem like an aspect of personal character, and it isn't.
                  Coincidentally, great intelligence is only loosely connected to being a good programmer.
                </p>
                <p className="about-text">
                  What? You don't have to be superintelligent?
                </p>
                <p className="about-text">
                  No, you don't. Nobody is really smart enough to program computers.
                  Fully understanding an average program requires an almost limitless capacity
                  to absorb details and an equal capacity to comprehend them all at the same time.
                  The way you focus your intelligence is more important than how much intelligence you have…
                </p>
                <p className="about-quote">
                  …most of programming is an attempt to compensate for the strictly limited size of our skulls.
                  The people who are the best programmers are the people who realize how small their brains are.
                  They are humble. The people who are the worst at programming are the people who refuse to
                  accept the fact that their brains aren't equal to the task.
                  Their egos keep them from being great programmers.
                  The more you learn to compensate for your small brain, the better a programmer you'll be.
                  The more humble you are, the faster you'll improve.
                </p>
                <p className="about-citation">
                  --From Steve McConnell's <em>Code Complete</em>.
                </p>
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
