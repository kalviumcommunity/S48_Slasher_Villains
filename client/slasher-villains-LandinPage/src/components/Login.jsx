import { useState } from "react";
import './Login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);

  const validateEmail = (email) => {
    return email.includes("@");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      // Your login logic goes here
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
          id="email"
          className="form-field"
          type="text"
          placeholder="Email"
          name="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        {submitted && !credentials.email && (
          <span>Please enter your email</span>
        )}
        {submitted && credentials.email && !validateEmail(credentials.email) && (
          <span>Please enter a valid email address</span>
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
