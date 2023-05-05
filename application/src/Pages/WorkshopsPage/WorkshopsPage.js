import React from 'react'
import { Header } from '../../sections/Header/Header'
import { Footer } from '../../sections/Footer/Footer'
import './WorkshopsPage.css'
import Axios from "axios"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


export const WorkshopsPage = () => {

  // useState to make API data extraction synchronous
  const [workshops, setworkshop] = useState([])

  useEffect(() => {
    // call the API by Axios to display workshops in the collection workshops in the PFA DB here
    Axios.get("http://localhost:5000/workshops")
    .then(res => {
      setworkshop(res.data)
    })
  }, [])

  return (
    <div className='page'>
      <Header /> 
      <div style={{display:'flex' }}>
        <div className='start'>
          <h1 ClassName='title'>Uncover the available workshops and their schedules !</h1>
          <ul className="custom-bullet1">
          <li>Scroll down and Find the workshops that suit your interests. </li>
          <li>Click the button below to access additional information and to register.</li>
           </ul>
        </div>
       
      </div>
      
      
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
            <div>
                <Link to={`/workshops/${workshop._id}`}><button variant="primary">View more details here !</button></Link>
              </div>
          </div>
          </div>
        )
      })}
      </div>
       <div ClassName='bware'> 
            <Footer />
       </div>
  
    </div>
  )
}
