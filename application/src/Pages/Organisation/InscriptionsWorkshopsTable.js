import React, { useState, useEffect } from 'react';
import './InscriptionWo.css';

const InscriptionsWorkshopsTable = () => {
  const [inscriptions, setInscriptions] = useState([]);
  
  useEffect(() => {
    // Fetch data from the Express.js API
    fetch('http://localhost:5000/getEnrolledStudentsPerWorkshop')
      .then(response => response.json())
      .then(data => setInscriptions(data))
      .catch(error => console.error('Error fetching inscriptionsWorkshops:', error));
  }, []);

  return (
    <div className='inscription' style={{marginTop: "3px", marginBottom: "3px"}}>
      <h2  style={{  marginBottom:'20px' }} >Inscriptions Workshops.. check your name bellow :</h2> 
      <div className='Elemnts'>
         <table className='T1' style={{marginBottom:"50px"}} >
        <thead>
          <tr>
            <th>Workshop Session</th>
            <th>List of enrolled students</th>
          </tr>
        </thead>
        <tbody>
          {inscriptions.map(inscription => (
            <tr key={`${inscription.workshopName}-${inscription.workshopId}`}>
              <td style={{fontWeight:"bold"}}>{inscription.workshopName}</td>
              <td>
                <ul>
                  {inscription.students.map(student => (
                    <li style={{listStyle:"square"}} key={`${student.studentFirstName}-${student.studentLastName}`}>
                      <h6>Student Details</h6>
                      <h6 style={{color:"black"}}>Student FullName : {student.studentFirstName} {student.studentLastName}</h6>
                      <h6 style={{color:"black"}}>Student Section : {student.studentSection}</h6>
                      <h6 style={{color:"black"}}>Student Identifier : {student.studentCode}</h6>
                      <h6>Note that Student Identifier is just used to differenciate between students they may are in the same classroom with the same firstname and lastname</h6>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
     
    </div>
  );
};

export default InscriptionsWorkshopsTable;