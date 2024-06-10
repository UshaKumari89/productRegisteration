
// export default SignUp;
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./UserRegister.scss";
import Button from "./Button";

const SignUp = ({ productInfo }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
  };


  useEffect(() => {
    //console.log('Product Info in signin:', productInfo);
  }, [productInfo]);


  useEffect(() => {
    const { state } = location;
    if (state && state.email) {
      setEmail(state.email);
      setName(state.name);
    }
    //console.log("Email from UserRegister component:", state.email);
  }, [location]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the checkboxes are checked
      if (!termsChecked) {
        window.alert("Please agree to the terms and conditions");
        return;
      }

      console.log("Email in state:", email); // Log the email from state
      console.log("Name in state:", name); // Log the name from state
    const response = await axios.post("http://localhost:8000/api/createuser", {
      //const response = await axios.post("https://productregisteration.onrender.com/api/createuser", {
        name,
        surname,
        email,
        password,
        product: productInfo.name
      });

      if (response.data.success) {
        console.log("User created successfully.");
        navigate('/login', { state: { email, name } });
      } else {
        setError("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user");
    }
  };

  
  return (
    <div className="signup-login-container">
      <h2>Become Dometician!</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <section>
            <input
              type="text"
              id="name"
              className="input"
              placeholder="John"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span>*</span>
          </section>
          <label htmlFor="name">Name</label>
        </div>
        <div className="input-container">
          <section>
            <input
              type="text"
              id="surname"
              placeholder="Deo"
              className="input"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </section>
          <label htmlFor="surname">Surname</label>
        </div>
        <div className="input-container">
          <section>
      
            <input
  type="email"
  id="email"
  placeholder="john@gmail.com"
  className="input"
  defaultValue={email}  // Use defaultValue instead of value
  onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <span>*</span>
          </section>
          <label htmlFor="password">Password</label>
        </div>
        <section>
          
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="newsletter"
              
            />
            <label htmlFor="newsletter">Subscribe to Newsletter & Communication</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="terms"
              checked={termsChecked}
              onChange={handleTermsChange}
            />
            <label htmlFor="terms">I agree to the Terms and Conditions</label>
          </div>
        </section>
        {error && <div className="error">{error}</div>}
        <Button label="Sign up & Register" type="submit" />
      </form>
    </div>
  );
};

export default SignUp;
