import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import { Footer } from '../sections/Footer/Footer';
import { Link } from 'react-router-dom';

function Login() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { firstName, lastName, code });
      if (response.status === 200) {
        window.location.href = '/';
        window.alert("Welcome to our family");
      } else {
        setError('Invalid login credentials. Please make sure you are providing valid information');
      }
    } catch (error) {
      console.error(error);
      setError('Invalid login credentials. Please make sure you are providing valid information');
    }
  };

  return (
    <>
    <h1>/***/ Welcome To Our Enetcom Clubs Management Web Application /***/</h1>
    <div className="login-container">
      <h2>Students Login Page</h2>
      <form>
        <label>
          Student First Name :
          <input type="text" onChange={(event) => setFirstName(event.target.value)} />
        </label>
        <br />
        <label>
          Student Last Name :
          <input type="text" onChange={(event) => setLastName(event.target.value)} />
        </label>
        <br />
        <label>
          Student Insc Code :
          <input type="password" onChange={(event) => setCode(event.target.value)} />
        </label>
        <br />
        <button type='submit' onClick={handleSubmit}>Login</button>
        <div class="badge text-bg-light p-2"><Link to="/admin">Are You an Administrator ? So Go Here ==&gt;</Link></div>
        {error && <h6 className="alert error">{error}</h6>}
      </form>
    </div>
    <Footer />
    </>
  );
}

export default Login;
