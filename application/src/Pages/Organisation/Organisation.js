import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../sections/Footer/Footer';
import './Organisation.css';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import InscriptionsFormationsTable from './InscriptionsFormationsTable';
import InscriptionsWorkshopsTable from './InscriptionsWorkshopsTable';
import { Sessions } from './Sessions';

export const Organisation = () => {


  const [formationStartDate, setFormationStartDate] = useState("");
  const [formations, setFormations] = useState([])

  const [workshopDate, setWorkshopDate] = useState("");
  const [workshops, setWorkshops] = useState([])

  useEffect(() => {
    if (formationStartDate === '') {
      setFormations([]);
    }
    if (workshopDate === '') {
      setWorkshops([]);
    }
  }, [formationStartDate, workshopDate]);  

  // function filterByDateFormations
  const filterByDateFormations = () => {
    if (formationStartDate) {
      Axios.get(`http://localhost:5000/formationsFiltredByDate?startDate=${formationStartDate}`, {timeout : 5000})
      .then(response => setFormations(response.data))
      .catch(error => console.error(error));
    } else {
      setFormations([]);
    }
  }

  // function filterByDateWorkshops
  const filterByDateWorkshops = () => {
    if (workshopDate) {
      Axios.get(`http://localhost:5000/workshopsFiltredByDate?startDate=${workshopDate}`, {timeout : 5000})
      .then(response => setWorkshops(response.data))
      .catch(error => console.error(error));
    } else {
      setWorkshops([]);
    }
  }

  return (
    <>
    <Navbar/>
    <div className='venue'>
      <h2>To begin, enter the date and locate the venue for your training session : </h2>
    </div>   
   
    <div style={{display:'flex'}}>
        <div className='filtered-by-date-formations'>
          <div className='Flter-element1'>
            <h3>Formations Date Checker</h3>
    <input type='string' value={formationStartDate} onChange={e => setFormationStartDate(e.target.value)} placeholder="DD/MM/YYYY" />
    <button onClick={filterByDateFormations}>Filter By Date</button>
   
    </div>
      
    <div className='event-handler'>
      {formations.map(formation => (
        <div key={formation._id}>
          <li style={{listStyle:"square"}}> {formation.formationName}
          <span style={{color:"black"}}>
            <h6>--&gt; Formation Start Date : {formation.startDateFormation}</h6>
            <h6>--&gt; Formation Trainer Name : {formation.formateurFirstName} {formation.formateurLasttName}</h6>
            <h6>--&gt; Formation Capacity : {formation.formationCapacity}</h6>
            <h6>--&gt; Formation Price : {formation.price}</h6>
            <h6>--&gt; Formation Sessions Number : {formation.sessionsNumber}</h6>
          </span>
          </li>
        </div>
      ))}
    </div>
    </div>

      <div className='filtered-by-date-workshops'>
      <div className=' Flter-element '>
        <h3>Workshops Date Checker</h3>
        <input type='string' value={workshopDate} onChange={e => setWorkshopDate(e.target.value)}  placeholder="DD/MM/YYYY" />
        <button onClick={filterByDateWorkshops}>Filter By Date</button> 
      </div>

    

    <div className='event-handler'>
      {workshops.map(workshop => (
        <div key={workshop._id}>
          <li style={{listStyle:"square"}}> {workshop.workshopName}
          <span style={{color:"black"}}>
            <h6>--&gt; Workshop Date : {workshop.workshopDate}</h6>
            <h6>--&gt; Workshop Trainer Name : {workshop.formateurFirstName} {workshop.formateurLastName}</h6>
            <h6>--&gt; Workshop Capacity : {workshop.workshopCapacity}</h6>
            <h6>--&gt; Workshop Room : {workshop.room}</h6>
            <h6>--&gt; Workshop Start Hour : {workshop.startHour}</h6>
          </span>
            
          </li>
        </div>
      ))}
    </div>
    </div>
    </div>


    <div className='SessionContainer '>
        <Sessions/>
    </div>
   
    <div className='content-container'>
        <div className='Inscriptions'>
            <InscriptionsFormationsTable/> <br/> 
        </div>
      <div>
        <InscriptionsWorkshopsTable/>
      </div>
     
     </div> 

    <Footer />
    </>
  )
}
