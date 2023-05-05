import React from 'react'
import './Feedback.css'
import { Link } from "react-router-dom";
import Axios from "axios"
import { useState, useEffect } from 'react'

export const Feedback = () => {

    // useState to make API data extraction synchronous
  const [feedbacks, setfeedback] = useState([])

  useEffect(() => {
    // call the API by Axios to display feedbacks in the collection feedbacks in the PFA DB here
    Axios.get("http://localhost:5000/feedbacks")
    .then(res => {
      setfeedback(res.data)
    })
  }, [])

  return (
    <div className='container feedback-container'>
        <h3 className='feedback-title'>Some feedbacks shared by our students</h3>

    <div className='row'>
      {feedbacks.slice(0,3).map(feedback => {
        return(
          <div className='col-3 container'>
          <div class="card_bg-light" style={{width: "100%",}} key={feedback._id}>
          <img src="images/FEEDBACKICON.png"   className="card-img-top" alt="feedback-image" />
            <div className="card-body1">
              <h5 className="card-title" style={{fontFamily:"serif" , color:"black" ,fontSize:"19px"}}> Formation Name : {feedback.formationName}</h5>
              <h6 className="card-text" style={{color:"white",}}>Student  : {feedback.studentFirstName} {feedback.studentLastName}</h6>
             
              <h6 className="card-text" style={{color:"white" }}>Section : {feedback.studentSection}</h6>
              <h6 className="card-text" style={{color:"white" }}>Content : {feedback.feedbackContent}</h6>
              <h6 className="card-text" style={{color:"red" }}>Stars Rating : {feedback.feedbackRating} Stars</h6>
            </div>
          </div>
          </div>
        )
      })}
      </div>
        <div className='btn'>
            <a className='to-feedback'><Link to="/feedback">Have a feedback to share with us ? click here</Link></a>
        </div>
    </div>
  )
}
