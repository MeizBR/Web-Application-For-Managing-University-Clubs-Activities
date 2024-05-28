import React, { useState } from 'react'
import axios from 'axios';
import '../Login.css'
import { Footer } from '../../sections/Footer/Footer';
import { Link } from 'react-router-dom';

export const AdminLogin = () => {

  const [fullName, setAdminFullName] = useState('');
  const [password, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/adminLogin', { fullName, password });
      if (response.status === 200) {
        window.location.href = '/adminInterface';
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
    <div className='body'>
        <h1>Welcome To Our Enetcom Clubs Management Web Application</h1>
        <div className="login-container">
        <h2>Administrators Login Page</h2>
        <form>
            <label>
            Admin FullName
            <input style={{marginLeft : "40px"}} type="text" onChange={(event) => setAdminFullName(event.target.value)} />
            </label>
            <br />
            <label>
            Admin Password
            <input style={{marginLeft : "40px"}} type="password" onChange={(event) => setAdminPassword(event.target.value)} />
            </label>
            <br />
            <button type='submit' onClick={handleSubmit}>Login</button>
            <div class="badge text-bg-light p-2"><Link to="/">Are You a Student ? So Go Here ==&gt;</Link></div>
            {error && <h6 className="alert error">{error}</h6>}
        </form>
        </div>
        <Footer />
    </div>
  )
}
