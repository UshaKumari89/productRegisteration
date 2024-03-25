
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

const LogIn = ({productInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const { state } = location;
    if (state && state.email) {
      setEmail(state.email);
    }
  }, [location]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        console.error("Please enter both email and password");
        return;
      }

      setLoggingIn(true);

      //console.log('Logging in with email:', email);

      const response = await axios.post("http://localhost:8000/api/login", { email, password, productInfo,});

      if (response.data.success) {
        const { email, name, registrationDate } = response.data
        navigate("/confirmation", { state: { email, name, registrationDate } });
        //console.log("Navigating to confirmation with name:", name);
       //console.log("Navigating to confirmation with email :", email);
     // console.log("login with date :", registrationDate);
      }
       else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };

  return (
    <div className="signup-login-container">
      <h2>Welcome!!!!</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <section>
            <input
              type="email"
              id="email"
              placeholder="john@gmail.com"
              className="input"
              value={email}
              onChange={handleEmailChange}
              required
              autoComplete="username"
            />
            <span>*</span>
          </section>
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-container">
          <section className="form-group">
            <input
              type="password"
              id="password"
              className="input"
              placeholder="*****"
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="current-password"
            />
            <span>*</span>
          </section>
          <label htmlFor="password">Password</label>
        </div>
       

        <Button
          label={loggingIn ? " " : "Log In"}
          type="submit"
          disabled={loggingIn}
          loggingIn={loggingIn}
        />
        {/* {loggingIn && (
          <div className="loading-icon">
            <i className="fa fa-spinner fa-spin"></i> 
          </div>
        )} */}
      </form>
    </div>
  );
};

export default LogIn;
