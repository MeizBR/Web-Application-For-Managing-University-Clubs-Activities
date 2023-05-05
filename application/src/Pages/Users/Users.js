import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../sections/Footer/Footer';
import './Users.css'
import Axios from "axios"
import { useState, useEffect } from 'react'

export const Users = () => {

  // for students
  // useState to make API data extraction synchronous
  const [students, setStudents] = useState([])

  useEffect(() => {
    // call the API by Axios to display students in the collection students in the PFA DB here
    Axios.get("http://localhost:5000/students")
    .then(res => {
      setStudents(res.data)
    })
  }, [])


  // for formateurs
  // useState to make API data extraction synchronous
  const [formateurs, setFormateurs] = useState([])

  useEffect(() => {
    // call the API by Axios to display formateurs in the collection formateurs in the PFA DB here
    Axios.get("http://localhost:5000/formateurs")
    .then(res => {
      setFormateurs(res.data)
    })
  }, [])


  return (
    <>
      <Navbar />

      <h1 id='title'>Want to know our team ? check the lists below ⬇ ⬇ ⬇</h1>
      <div class="accordion accordion-flush users-container" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        <div className='badge badge bg-danger text-light'><h4>Students list</h4></div>
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      {students.map(student => {
        return(
          <ul className='container' id='student-list' key={student._id}>
            <h3>Student Information</h3>
            <li><span>First Name : </span> {student.studentFirstName}</li>
            <li><span>Last Name : </span> {student.studentLastName}</li>
            <li><span>Section : </span> {student.studentSection}</li>
            <li><span>Email : </span> {student.studentEmail}</li>
          </ul>
        )
      })}
      </div>
    </div>
  </div>


  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        <div className='badge badge bg-danger text-light'><h4>Formateurs list</h4></div>
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      {formateurs.map(formateur => {
        return(
          <ul className='container' id='student-list' key={formateur._id}>
            <h3>Formateur Information</h3>
            <li><span>First Name : </span> {formateur.formateurfirstName}</li>
            <li><span>Last Name : </span> {formateur.formateurLastName}</li>
          </ul>
        )
      })}
      </div>
    </div>
  </div>
</div>

      <Footer />
    </>
    
  )
}
