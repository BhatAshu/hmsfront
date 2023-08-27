import React, { useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleLoginOptions = () => {
    setShowLoginOptions((prevState) => !prevState);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleStaffLoginClick = () => {
    navigate('/login'); 
  };

  const handleUserLoginClick = () => {
    navigate('/loginuser'); // Navigate to the user login page
  };


  return (
    <div className="App">
       <header>
        <h1>Medface Software - Hospital Management</h1>
        <nav>
          <ul className="menu">
            <li>About Us</li>
            <li>Services</li>
            <li>Contact Us</li>
            </ul>
          <div className="login-button" onClick={toggleLoginOptions}>
            Login
            {showLoginOptions && (
              <div className="login-options">
                <p>Login as:</p>
                <button onClick={handleStaffLoginClick} className="plain-button">Staff</button>
                <button onClick={handleUserLoginClick} className="plain-button">User</button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {showModal && (
        <div className="modal">
          <div className="login-options">
            <p onClick={toggleModal}><a href="#">Login as Staff</a></p>
            <p onClick={toggleModal}><a href="#">Login as User</a></p>
          </div>
        </div>
      )}

      <main>
        <h2>Welcome to our Hospital/Clinic!</h2>
        <p>
          We are dedicated to providing high-quality medical services to our patients.
          Our team of skilled doctors and healthcare professionals ensures that you receive the best care possible.
        </p>

        <h3>About Us</h3>
        <p>
          At Medface Software, we leverage cutting-edge technology to streamline hospital management processes.
          Our software solutions are designed to enhance efficiency, reduce administrative burdens,
          and improve patient outcomes.
        </p>

        <h3>Our Services</h3>
        <ul>
          <li>Electronic Health Records (EHR) Management</li>
          <li>Appointment Scheduling</li>
          <li>Billing and Invoicing</li>
          <li>Inventory Management</li>
          <li>Staff Rostering</li>
        </ul>

        <h3>Contact Us</h3>
        <p>
          For any inquiries or to book an appointment, please call us at: <a href="tel:+1234567890">+1234567890</a>.
          You can also email us at: <a href="mailto:info@medfacesoftware.com">info@medfacesoftware.com</a>.
        </p>
      </main>

      <footer>
        &copy; {new Date().getFullYear()} Medface Software. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;