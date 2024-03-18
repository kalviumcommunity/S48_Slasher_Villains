import { useState, useEffect } from "react";
import './Signup.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Signup() {
  const [fields, setFields] = useState({
    username: Cookies.get('signupUsername') || "",
    password: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Save username to cookie when it changes
    Cookies.set('signupUsername', fields.username);
  }, [fields.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!fields.username || fields.username.length < 4) {
      errors.username = "Please enter a valid username (at least 4 characters)";
    }
    if (!fields.password) {
      errors.password = "Please enter your password";
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://localhost:3005/register", fields);
        if (response.status === 201) {
          const loginResponse = await axios.post("http://localhost:3005/login", {
            username: fields.username,
            password: fields.password
          });
          if (loginResponse.status === 200) {
            const token = loginResponse.data.token;
            localStorage.setItem('token', token);
            navigate('/landing');
          }
        }
      } catch (error) {
        console.error(error);
        // Handle signup error
      }
    }

    setValidationErrors(errors);
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && Object.keys(validationErrors).length === 0 && (
          <div className="success-message">Signup successful!</div>
        )}
        <input
          id="username"
          className="form-field"
          type="text"
          placeholder="Username"
          name="username"
          value={fields.username}
          onChange={(e) => setFields({ ...fields, username: e.target.value })}
        />
        {submitted && validationErrors.username && <span>{validationErrors.username}</span>}
        <input
          id="password"
          className="form-field"
          type="password"
          placeholder="Password"
          name="password"
          value={fields.password}
          onChange={(e) => setFields({ ...fields, password: e.target.value })}
        />
        {submitted && validationErrors.password && <span>{validationErrors.password}</span>}
        
        <button className="form-field-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
