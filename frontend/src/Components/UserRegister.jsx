
// export default UserRegister;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './UserRegister.scss';
import Button from './Button';

const UserRegister = ({ productInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const { state } = location;
    if (state && state.email) {
      setEmail(state.email);
      setEmailValid(true);
    }
  }, [location]);


  useEffect(() => {
    //console.log('Product Info in userRegister:', productInfo);
  }, [productInfo]);


  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailValid(emailValue.trim() !== '');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!emailValid) {
        setError('Email is required');
        return;
      }
  
      //console.log('Sending request to check email:', email); // Log the email here
  
      const response = await axios.post('https://productregisteration.onrender.com/api/checkEmail', { email });
  
      //console.log('Response:', response);
  
      if (response.data.exists) {
        //console.log('User exists. Redirecting to login page:', email);
        navigate('/login', { state: { email: email, name: ''  } });
      } else {
        console.log('User does not exist. Redirecting to signup page:', email);
        // navigate('/signup', { state: { email: email } });
        navigate('/signup', { state: { email: email, name: '' } });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setError('Failed to check email');
    }
  };
  
  
  return (
    <div className="signup-login-container">
      <h2>Sign Up or Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <section>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={handleEmailChange}
              className={`input ${!emailValid ? 'invalid' : ''}`}
              required
            />
            <span>*</span>
          </section>
          <label htmlFor="email">Email</label>
        </div>
        {error && <div className="error">{error}</div>}
        <Button label="Continue" type="submit" />
      </form>
    </div>
  );
};

export default UserRegister;
