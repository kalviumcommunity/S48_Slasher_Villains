import { useState, useEffect } from "react";
import './Login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Login() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: Cookies.get('loginUsername') || "",
    password: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    // Save username to cookie when it changes
    Cookies.set('loginUsername', credentials.username);
  }, [credentials.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      try {
        const response = await axios.post("https://s48-slasher-villains-4.onrender.com/login", credentials);
        
          navigate('/landing')
          // const token = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
          // document.cookie = `token=${token}; path=/`;
          localStorage.setItem("userID", response.data.userId);
          localStorage.getItem("userID");
          localStorage.setItem("token",response.data.token)
          Cookies.set('token1', response.data.token); // Set the token as a cookie

      
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