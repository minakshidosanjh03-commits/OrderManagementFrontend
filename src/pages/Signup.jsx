import React, { useState } from 'react';
import { useSignupMutation } from '../services/api';
import './../style.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();
  const [signup, { isLoading, error, data }] = useSignupMutation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData).unwrap();
      toast.success('Signup successful!', {
        position: "top-right",
        autoClose: 3000,
      });
      navigate('/');
    } catch (err) {
       toast.error('Signup failed. Please try again!', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      {error && <p>Error signing up. Please try again!</p>}
       <ToastContainer />
       <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
};

export default Signup;
