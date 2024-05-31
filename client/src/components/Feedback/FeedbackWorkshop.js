import React from 'react'
import './Feedback.css'
import { Link } from "react-router-dom";
import Axios from "axios"
import { useState, useEffect } from 'react'
import Rating from 'react-rating-stars-component';

export const FeedbackWorkshop = () => {

    // useState to make API data extraction synchronous
  const [feedbacks, setfeedback] = useState([])

  useEffect(() => {
    // call the API by Axios to display feedbacks in the collection feedbacks in the PFA DB here
    Axios.get("/api/feedbacksWorkshops")
    .then(res => {
      setfeedback(res.data)
    })
  }, [])

  return (
    <div className='container feedback-container'>
        <h3 className='feedback-title'>Some Workshops Feedbacks Shared By Our Students</h3>

    <div className='row'>
      {feedbacks.slice(0,3).map(feedback => {
        return(
          <div className='col-3 container'>
          <div class="card_bg-light" style={{width: "100%",}} key={feedback._id}>
          <img src="images/FEEDBACKICON.png"   className="card-img-top" alt="feedback-image" />
            <div className="card-body1">
              <h5 className="card-title" style={{fontFamily:"serif" , color:"black" ,fontSize:"19px"}}>Workshop Name : {feedback.workshopName}</h5>
              <h6 className="card-text" style={{color:"white",}}>Trainer  : {feedback.formateurFirstName} {feedback.formateurLastName}</h6>
              <h6 className="card-text" style={{color:"white",}}>Student  : {feedback.studentFirstName} {feedback.studentLastName}</h6>
              <h6 className="card-text" style={{color:"white" }}>Section : {feedback.studentSection}</h6>
              <h6 className="card-text" style={{color:"white" }}>Content : {feedback.feedbackContent}</h6>
              <h6 className="card-text" style={{color:"red" }}>Stars Rating : 
                <Rating
                    count={6}
                    size={35}
                    activeColor="RED"
                    color="GRAY"
                    value={feedback.feedbackRating}
                  />
              </h6>
            </div>
          </div>
          </div>
        )
      })}
      </div>

        <div className='btn'>
            <a className='to-feedback'><Link to="/feedbackWorkshops">Have a feedback to share with us ? click here</Link></a>
        </div>
    </div>
  )
}
