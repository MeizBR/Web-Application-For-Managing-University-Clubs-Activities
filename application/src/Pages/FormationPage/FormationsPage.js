import React from 'react'
import { Header } from '../../sections/Header/Header'
import { Footer } from '../../sections/Footer/Footer';
import './FormationPage.css'
import Axios from "axios"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export const FormationsPage = () => {

  // useState to make API data extraction synchronous
  const [formations, setformation] = useState([])

  useEffect(() => {
    // call the API by Axios to display formations in the collection formations in the PFA DB here
    Axios.get("http://localhost:5000/formations")
    .then(res => {
      setformation(res.data)
    })
  }, [])


  return (
    <div className='fpage'>
    
      <Header />
      <div style={{display:'flex' }}>
        <div className='start'>
          <h1 ClassName='title'>Uncover the available Formations and their schedules !</h1>
          <ul className="custom-bullet1">
          <li>Scroll down and Find the Formation that suit your interests. </li>
          <li>Click the button below to access additional information and to register.</li>
           </ul>
        </div>
       
      </div>
   

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
          
              <div>
                <Link to={`/formations/${formation._id}`}><button variant="primary">View more details here !</button></Link>
              </div>
            </div>
          </div>
          </div>
        )
      })}
      </div>

      <Footer />
    </div>
  )
}
