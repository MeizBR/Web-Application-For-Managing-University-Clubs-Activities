import { React, useState, useEffect } from 'react';
import Rating from 'react-rating-stars-component';
import Axios from "axios";
import './FeedbackPage.css';
import { Header } from '../../sections/Header/Header';
import { Footer } from '../../sections/Footer/Footer';

export const FeedbackPage = () => {

  const [formations, setFormation] = useState([]);

  // useEffect to make API data extraction synchronous
  useEffect(() => {
    Axios
      .get("http://localhost:5000/formations")
      .then((res) => setFormation(res.data))
      .catch((err) => console.log(err));
  });

  const [feedbacks, setFeedbacks] = useState([]);

  const [formationName, setFormationName] = useState("")
  const [formateurFirstName, setFormateurFirstName] = useState("")
  const [formateurLastName, setFormateurLastName] = useState("")
  const [studentFirstName, setStudentFirstName] = useState("")
  const [studentLastName, setStudentLastName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [studentSection, setStudentSection] = useState("")
  const [studentCode, setStudentCode] = useState("")
  const [feedbackContent, setFeedbackContent] = useState("")
  const [feedbackRating, setFeedbackRating] = useState(0);

  const [allowedCodes, setAllowedCodes] = useState([]);
  const [allowedFirstNames, setAllowedFirstNames] = useState([]);
  const [allowedLastNames, setAllowedLastNames] = useState([]);
  const [allowedSections, setAllowedSections] = useState([]);
  const [allowedEmails, setAllowedEmails] = useState([]);

  // extract the students data
  useEffect(() => {
    Axios
      .get("http://localhost:5000/students")
      .then((res) => {
        const codes = res.data.map((student) => student.studentCode);
        const firstnames = res.data.map((student) => student.studentFirstName);
        const lastnames = res.data.map((student) => student.studentLastName);
        const sections = res.data.map((student) => student.studentSection);
        const emails = res.data.map((student) => student.studentEmail);
        setAllowedCodes(codes);
        setAllowedFirstNames(firstnames);
        setAllowedLastNames(lastnames);
        setAllowedSections(sections);
        setAllowedEmails(emails);

      })
      .catch((err) => console.log(err));
  }, []);

  const handleFormationChange = (e) => {
    // Get the selected formation
    const selectedFormation = formations.find(
      (formation) => formation.formationName === e.target.value
    );
    // Set the state with the formateurFirstName and formateurLastName associated with the selected formation
    setFormationName(selectedFormation.formationName);
    setFormateurFirstName(selectedFormation.formateurFirstName);
    setFormateurLastName(selectedFormation.formateurLastName);
  };

  // define the function submitFeedback
  const submitFeedback = () => {
    if(
        formationName !== '' &&
        studentFirstName.trim() !== '' &&
        studentLastName.trim() !== '' &&
        studentEmail.trim() !== '' &&
        studentEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
        studentSection !== '' &&
        studentCode.trim() !== '' &&
        !isNaN(studentCode) &&
        feedbackContent.trim() !== '' &&
        feedbackRating !== '' &&
        feedbackRating !== null
      ) {
          if (
            allowedCodes.includes(Number(studentCode)) &&
            allowedFirstNames.includes(studentFirstName) &&
            allowedLastNames.includes(studentLastName) &&
            allowedSections.includes(studentSection) &&
            allowedEmails.includes(studentEmail)
          ) {
              Axios.post("http://localhost:5000/submitAFeedback", {
                    formationName : formationName,
                    formateurFirstName : formateurFirstName,
                    formateurLastName : formateurLastName,
                    studentFirstName : studentFirstName,
                    studentLastName : studentLastName,
                    studentEmail : studentEmail,
                    studentSection : studentSection,
                    studentCode: studentCode,
                    feedbackContent : feedbackContent,
                    feedbackRating : feedbackRating,
                    createdAt : new Date()
                })
                .then(res => {
                    console.log(res.data);
                    setStudentFirstName("");
                    setStudentLastName("");
                    setStudentEmail("");
                    setStudentSection("");
                    setStudentCode("");
                    document.getElementById("myForm").reset();
                    document.getElementById("section").selectedIndex = 0;
                })
                .catch((err) => {
                  if (err.response && err.response.status === 400) {
                    alert(err.response.data.message);
                    console.log(err.response.data.message);
                } else {
                    console.log(err);
                    alert("An error occurred. Please try again later.");
                }
                });
          } else {
            alert("This student does not exist. Please make sure you are from our family");
          }
      } else {
        alert("Please fill in all required fields or make sure you are providing valid information");
    }
  }


 // Fetch feedbacks data
 useEffect(() => {
  Axios.get("http://localhost:5000/feedbacks")
    .then((res) => setFeedbacks(res.data))
    .catch((err) => console.log(err));
}, []);


const calculatePercentage = (formationName, rating) => {
  const formationFeedbacks = feedbacks.filter(
    (feedback) => feedback.formationName === formationName
  );
  const totalFeedbacks = formationFeedbacks.length;
  const ratingFeedbacks = formationFeedbacks.filter(
    (feedback) => feedback.feedbackRating === rating
  );
  const percentage =
    (ratingFeedbacks.length / totalFeedbacks) * 100 || 0; // handle divide by zero error
  return percentage.toFixed(2); // round to two decimal places
};


  return (
    <>

      <Header />
      <div style={{marginTop:"35px"}} className='titrFeedback'>
          <h1>FormationsFeedbacks</h1>
        </div>
      <div style={{display:'flex' }}>
       <div className="welcomec">
    
    <h1 className="title5"> Your thoughts are important to us, please let us know what you think !</h1>
    <ul className="custom-bullets">
      <li>Please fill out the form ahead </li>
      <li>Look bellow to see our best </li>  
    </ul></div>
    <div>
      <form id='myForm' className='feedback-form-container'>
          <legend>Please don't hesitate ! </legend>
          <table>
            <tbody>
              <tr>
                <td><label>Formation</label></td>
                <td>
                  <select style={{width:"100%"}} id='section' onChange={handleFormationChange} >
                    <option disabled selected value="">Please select a formation to rate</option>
                  {formations.map(formation => {
                    return(
                          <option key={formation._id} value={formation.formationName}>{formation.formationName}</option>
                    )
                  })}
                  </select>
                </td>
              </tr>
              <tr>
                <td><label>Student first name</label></td>
                <td><input style={{width:"100%"}} type="text" required onChange={e => setStudentFirstName(e.target.value)} /></td>
              </tr>
              <tr>
                <td><label>Student last name</label></td>
                <td><input style={{width:"100%"}} type="text" required onChange={e => setStudentLastName(e.target.value)} /></td>
              </tr>
              <tr>
                <td><label>Student email</label></td>
                <td><input style={{width:"100%"}} type="email" required onChange={e => setStudentEmail(e.target.value)} /></td>
              </tr>
              <tr>
                <td><label>Student code</label></td>
                <td><input style={{width:"100%"}} type="text" required onChange={e => setStudentCode(e.target.value)} /></td>
              </tr>
              <tr>
                <td><label>Student section</label></td>
                <td>
                  <select style={{width:"100%"}} id='section'  onChange={e => setStudentSection(e.target.value)}>
                    <option disabled selected value="">Please select your section</option>
                    <option value='GT'>GT</option>
                    <option value='GII'>GII</option>
                    <option value='GEC'>GEC</option>
                    <option value='IDSD'>IDSD</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label>Feedback content</label></td>
                <td><textarea style={{width:"100%"}} cols="40" rows="8" required onChange={e => setFeedbackContent(e.target.value)} /></td>
              </tr>
              <tr>
                <td><label>Select you satisfaction level</label></td>
                <td>
                <Rating
                  count={6}
                  size={60}
                  activeColor="RED"
                  color="GRAY"
                  value={feedbackRating}
                  onChange={e => setFeedbackRating(e)}
                />
                </td>
              </tr>
              <tr>
                <td colSpan={2}><button onClick={submitFeedback}>Submit</button></td>
              </tr>
            </tbody>
          </table>
      </form>
    </div>
  </div>
  <div>
      
  <h3>Rating Statistics</h3>                

  {formations.map((formation) => (
  <div className='progress-bar-container' key={formation._id}>
    <h3>Formation Name : {formation.formationName}</h3>
    <h3>Formation Identifier : {formation._id}</h3>
    <p>
      <span>1 Star:</span>
      <div className="progress-bar container">
        <div
          className="progress-bar-inner bg-primary"
          style={{ width: `${calculatePercentage(formation.formationName, 1)}%` }}
        >
          <div className="progress-bar-value">
            {calculatePercentage(formation.formationName, 1)}%
          </div>
        </div>
      </div>
      <br />
      <span>2 Stars:</span>
      <div className="progress-bar container">
        <div
          className="progress-bar-inner bg-success"
          style={{ width: `${calculatePercentage(formation.formationName, 2)}%` }}
        >
          <div className="progress-bar-value">
            {calculatePercentage(formation.formationName, 2)}%
          </div>
        </div>
      </div>
      <br />
      <span>3 Stars:</span>
      <div className="progress-bar container">
        <div
          className="progress-bar-inner bg-warning"
          style={{ width: `${calculatePercentage(formation.formationName, 3)}%` }}
        >
          <div className="progress-bar-value">
            {calculatePercentage(formation.formationName, 3)}%
          </div>
        </div>
      </div>
      <br />
      <span>4 Stars:</span>
      <div className="progress-bar container">
        <div
          className="progress-bar-inner bg-info"
          style={{ width: `${calculatePercentage(formation.formationName, 4)}%` }}
        >
          <div className="progress-bar-value">
            {calculatePercentage(formation.formationName, 4)}%
          </div>
        </div>
      </div>
      <br />
      <span>5 Stars:</span>
      <div className="progress-bar container">
        <div
          className="progress-bar-inner bg-danger"
          style={{ width: `${calculatePercentage(formation.formationName, 5)}%` }}
        >
          <div className="progress-bar-value">
            {calculatePercentage(formation.formationName, 5)}%
          </div>
        </div>
      </div>
      <br />
      <span>6 Stars:</span>
      <div className="progress-bar container">
        <div
          className="progress-bar-inner bg-dark"
          style={{ width: `${calculatePercentage(formation.formationName, 6)}%` }}
        >
          <div className="progress-bar-value">
            {calculatePercentage(formation.formationName, 6)}%
          </div>
        </div>
      </div>
    </p>
  </div>
))}


      </div>
      
      <Footer />
    </>
  )
}
