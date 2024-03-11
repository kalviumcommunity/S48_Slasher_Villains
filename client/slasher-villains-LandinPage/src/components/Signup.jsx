import { useState } from "react";
import './Signup.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
function Signup() {
  const [fields, setFields] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [validate, setValidation] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fields.username && fields.password && fields.email && fields.phoneNumber) {
      try {
        const response = await axios.post("http://localhost:3005/register", fields);
        if (response.status === 201) {
          // Automatically log in after successful registration
          const loginResponse = await axios.post("http://localhost:3005/login", {
            username: fields.username,
            password: fields.password
          });
          if (loginResponse.status === 200) {
            const token = loginResponse.headers['set-cookie'];
            localStorage.setItem('token', token);
             navigate('/');
          }
        }
      } catch (error) {
        console.error(error);
        // Handle signup error
      }
      setValidation(true);
    }
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && validate && (
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
        {submitted && (!fields.username || fields.username.length < 4) && <span>Please enter a valid username (at least 4 characters)</span>}
        <input
          id="email"
          className="form-field"
          type="email"
          placeholder="Email"
          name="email"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
        />
        {submitted && !fields.email && <span>Please enter your email</span>}
        <input
          id="phoneNumber"
          className="form-field"
          type="tel"
          placeholder="Phone Number"
          name="phoneNumber"
          value={fields.phoneNumber}
          onChange={(e) => setFields({ ...fields, phoneNumber: e.target.value })}
        />
        {submitted && !fields.phoneNumber && <span>Please enter your phone number</span>}
        <input
          id="password"
          className="form-field"
          type="password"
          placeholder="Password"
          name="password"
          value={fields.password}
          onChange={(e) => setFields({ ...fields, password: e.target.value })}
        />
        {submitted && (!fields.password || fields.password.length < 6) && <span>Please enter a valid password (at least 6 characters)</span>}
        
        <button className="form-field-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;