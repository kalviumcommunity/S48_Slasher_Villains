import { useState } from "react";
import './Login.css';
import axios from 'axios';

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      try {
        const response = await axios.post("http://localhost:3005/login", credentials);
        const { data } = response;
        if (data === 'Login successful') {
          localStorage.setItem('token', response.headers['set-cookie'][0]);
          // Redirect or handle login success
        }
      } catch (error) {
        console.error(error);
        // Handle login error
      }
      setValidated(true);
    }
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {submitted && validated && (
          <div className="success-message">Login successful!</div>
        )}

        <input
          id="username"
          className="form-field"
          type="text"
          placeholder="Username"
          name="username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        {submitted && !credentials.username && (
          <span>Please enter your username</span>
        )}

        <input
          id="password"
          className="form-field"
          type="password"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        {submitted && !credentials.password && (
          <span>Please enter your password</span>
        )}

        <button className="form-field-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}