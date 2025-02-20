import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const logIn = useStore((state) => state.logIn);
  const errorMessage = useStore((state) => state.authErrorMessage);
  const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

  useEffect(() => {
    // Clear the auth error message when the component unmounts:
    return () => {
      setAuthErrorMessage('');
    }
  }, [setAuthErrorMessage]);

  const handleLogIn = (event) => {
    event.preventDefault();

    logIn({
      username: username,
      password: password,
    });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogIn}>
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="form-input"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Log In
        </button>
      </form>
      {errorMessage && (
        <h3 className="error-message">{errorMessage}</h3>
      )}
    </div>
  );
}

export default LoginPage;
