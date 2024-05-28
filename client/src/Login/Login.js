import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css'
import { Footer } from '../sections/Footer/Footer';
import { Link } from 'react-router-dom';

function Login() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const [formations, setformation] = useState([])

  useEffect(() => {
    // call the API by Axios to display formations in the collection formations in the PFA DB here
    axios.get("http://localhost:5000/api/formations")
    .then(res => {
      setformation(res.data)
    })
  }, [])

          // useState to make API data extraction synchronous
          const [workshops, setworkshop] = useState([])

          useEffect(() => {
              // call the API by Axios to display workshops in the collection workshops in the PFA DB here
              axios.get("http://localhost:5000/api/workshops")
              .then(res => {
              setworkshop(res.data)
              })
          }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { firstName, lastName, code });
      if (response.status === 200) {
        window.location.href = '/home';
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
      <h2>Students Login Page</h2>
      <form>
        <label>
          Student First Name
          <input style={{marginLeft : "40px"}} type="text" onChange={(event) => setFirstName(event.target.value)} />
        </label>
        <br />
        <label>
          Student Last Name
          <input style={{marginLeft : "40px"}} type="text" onChange={(event) => setLastName(event.target.value)} />
        </label>
        <br />
        <label>
          Student Inscr Code
          <input style={{marginLeft : "40px"}} type="password" onChange={(event) => setCode(event.target.value)} />
        </label>
        <br />
        <button type='submit' onClick={handleSubmit}>Login</button>
        <div class="badge text-bg-light p-2"><Link to="/admin">Are You an Administrator ? So Go Here ==&gt;</Link></div>
        {error && <h6 className="alert error">{error}</h6>}
      </form>
    </div>

    <h2 style={{marginBottom:"0", textAlign:"center"}}>Take a look on our Trainings</h2>
    <div className='row m-1 formations-container'>
     {formations.map(formation => {
       return(
         <div className='col-3 mb-3 formation-container'>
         <div class="card bg-light formation-item" key={formation._id}>
           <img  src={`images/${formation.formationImage}`} class="formation" alt="formationImage" />
           <div class="card-body5">
             <h5 class="card-title1 ">{formation.formationName}</h5>
             <p class="card-text"><span>Start date :</span> {formation.startDateFormation}</p>
             <p class="card-text"><span>Sessions number :</span> {formation.sessionsNumber}</p>
             <p class="card-text"><span>Price :</span> {formation.price}</p>
             <p class="card-text"><span>Trainer </span> : {formation.formateurFirstName}  {formation.formateurLastName}</p>
           </div>
         </div>
         </div>
       )
     })}
     </div>

     <h2 style={{marginBottom:"0", textAlign:"center", marginTop:"30px"}}>Take a look on our Workshops</h2>
     <div className='row m-1 workshops-container'>
      {workshops.map(workshop => {
        return(
          <div className='col-3 workshop-container'>
          <div class="card bg-light workshop-item" key={workshop._id}>
            <img src={`images/${workshop.workshopImage}`} class="card-img-top workshop-image" alt="workshopImage" />
            <div className="card-body5">
              <h5 className="card-title1 ">{workshop.workshopName}</h5>
              <p class="card-text"><span>Date :</span> {workshop.workshopDate}</p>
              <p class="card-text"><span>Room :</span> {workshop.room}</p>
              <p class="card-text"><span>Start hour :</span> {workshop.startHour}</p>
              <p class="card-text"><span>Trainer :</span> {workshop.formateurFirstName} {workshop.formateurLastName}</p>
            </div>
          </div>
          </div>
        )
      })}
      </div>
    
    <Footer />
    </div>
  );
}

export default Login;
