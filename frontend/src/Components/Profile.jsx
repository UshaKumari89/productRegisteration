
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import userLogo from '../images/userlogo.png'; 
import "./Profile.scss";
import axios from 'axios'; 
import Modal from './Modal'; // Import your modal component

const Profile = ({ productInfo }) => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); 

  useEffect(() => {
    const { state } = location;
    if (state && state.email) {
      setEmail(state.email);
    }
    if (state && state.name) {
      setName(state.name);
    }
  }, [location]);

  const handleLogout = () => {
    navigate("/UserRegister");
  };

  const handleDeleteAccount = () => {
    setShowModal(true); // Open the modal when "Delete Account" is clicked
  };

  const confirmDeleteAccount = () => {
    // Make a request to delete the account
    axios.delete(`http://localhost:8000/api/users/${email}`)
      .then(response => {
        console.log('Account deleted successfully:', response.data);
        // Navigate to the home page or any other page after successful deletion
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting account:', error);
        // Handle error, show a message to the user, etc.
      });
    setShowModal(false); // Close the modal after account deletion
  };

  const cancelDeleteAccount = () => {
    setShowModal(false); // Close the modal when "Cancel" is clicked
  };

  return (
    <div className="profile">
      <div className="user-info">
        <div className="user-details">
          <h5>{name}'s Profile</h5>
          <p>{email}</p>
        </div>
        <img src={userLogo} alt="User Logo" className="user-logo" />
      </div>
      
      <section className='center'>
        <section>
          {productInfo && (
            <div className='product-info '>
              <h5>Your Products:</h5> 
              <h6>
              <a href={`/product/${productInfo.id}`}>
              {productInfo.name}
            </a>
          </h6>
            </div>
          )}
        </section>

        <div className="more-buttons">
          <Link to="https://product-registeration-page.vercel.app/app">
            <Button label="Device Registration" />
          </Link>
          <section className='buttons'>
            <Button label="Logout" onClick={handleLogout}/>
            <Button label="Delete Account" className="danger" onClick={handleDeleteAccount} />
          </section>
        </div>
      </section>

      {showModal && (
        <Modal onClose={cancelDeleteAccount}>
          
          <h3>Account Deletion</h3>
          <p>Are you sure you want to delete your account?</p>
          <div className="modal-buttons">
            <Button label="Cancel" onClick={cancelDeleteAccount} />
            <Button label="Delete" className="danger" onClick={confirmDeleteAccount} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
