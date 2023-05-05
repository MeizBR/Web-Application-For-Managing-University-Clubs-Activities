// import React, useEffect and useState from react
import React, { useEffect, useState } from 'react';

// import Link and useParams from react-router-dom
import { Link, useParams } from 'react-router-dom';

// import Axios from axios
import Axios from 'axios';
import './FormationElement.css'
import { Navbar } from '../../components/Navbar/Navbar';

// export the default component FormationElement
export const FormationElement = () => {

  const { id } = useParams();

  const [formation, setFormation] = useState([]);


  useEffect(() => {
    Axios
      .get(`http://localhost:5000/formations/${id}`)
      .then((res) => setFormation(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // define student information variables with useState
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentSection, setStudentSection] = useState("");
  const [studentCode, setStudentCode] = useState("");

  // define some constraints to allow students subscribed to the web app for submitting an inscription of a formation and prevent strangers from submitting requests with useState
  const [allowedCodes, setAllowedCodes] = useState([]);
  const [allowedFirstNames, setAllowedFirstNames] = useState([]);
  const [allowedLastNames, setAllowedLastNames] = useState([]);
  const [allowedSections, setAllowedSections] = useState([]);
  const [allowedEmails, setAllowedEmails] = useState([]);

  const [inscriptionsCount, setInscriptionsCount] = useState(0)

  // while the formation becomes inaccessible, the button will be disabled
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // extract the students data and define the constraints
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


  // Get the inscriptions count from the backend when component mounts
  useEffect(() => {
    if (formation._id) {
    Axios.get(`http://localhost:5000/formations/${formation._id}`)
      .then(res => {
        const storedCount = res.data.inscriptionsCount;
        if (storedCount) {
          setInscriptionsCount(storedCount);
        }
      })
      .catch(err => console.log(err));
    }
  }, [formation._id]);


  // define the condition in which the formation submission becomes impossible
  useEffect(() => {
    if (inscriptionsCount >= formation.formationCapacity) {
      setIsButtonDisabled(true);
    }
  }, [inscriptionsCount, formation.formationCapacity]);

  // the function submitInscription which send inscription data to the database
  const submitInscription = (e) => {
    e.preventDefault()
    if (inscriptionsCount <= formation.formationCapacity) {
      if(
        studentFirstName.trim() !== '' &&
        studentLastName.trim() !== '' &&
        studentEmail.trim() !== '' &&
        studentEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
        studentSection !== '' &&
        !isNaN(studentCode)
      ) {
        // Capitalize first letter of first and last name
        const capitalizedFirstName = studentFirstName.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
        const capitalizedLastName = studentLastName.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
        if (
          allowedCodes.includes(Number(studentCode)) &&
          allowedFirstNames.includes(capitalizedFirstName) &&
          allowedLastNames.includes(capitalizedLastName) &&
          allowedSections.includes(studentSection) &&
          allowedEmails.includes(studentEmail)
        ) {
            Axios.post("http://localhost:5000/submitAnInscriptionFormation", {
                  formationName : formation.formationName,
                  formationId : formation._id,
                  formateurFirstName : formation.formateurFirstName,
                  formateurLastName : formation.formateurLastName,
                  studentFirstName : capitalizedFirstName,
                  studentLastName : capitalizedLastName,
                  studentEmail : studentEmail,
                  studentSection : studentSection,
                  studentCode : studentCode,
              })
              .then(res => {
                  alert("Inscription submitted successfully")
                  console.log(res.data);
                  setStudentFirstName("");
                  setStudentLastName("");
                  setStudentEmail("");
                  setStudentCode("");
                  setStudentSection("");
                  document.getElementById("myForm").reset();
                  document.getElementById("section").selectedIndex = 0;
              })
              .catch((err) => {
                if (err.response && err.response.status === 400) {
                  alert(err.response.data.message);
                  document.getElementById("myForm").reset();
                  document.getElementById("section").selectedIndex = 0;
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
} else {
  alert("The formation is already full. Make sure you will come earlier in next events");
  }
  }


  

  return ( 
    
  <div  >   
    <Navbar/>
    <div style={{display:'flex' }}>
      <div className='workshopComponentDe'>
        <h1 className="title88">  Let's get started with your registration </h1>
        <ul className="custom-bullets">
            <li>Please fill out the form bellow </li>
            <li>Double Check all the information you inserted </li>  
          <li>Click Enroll Now to Register </li> 
        </ul>
    </div> 
    <div className='workshopComponentUN'>
      <div  className='Lastt'>
      <h1 className='WorkshopElementName'>{formation.formationName}</h1>
      <h5 style={{ fontWeight: 'bold', color: 'black' }}>Formation Capacity : {formation.formationCapacity}</h5>
      <p style={{ fontWeight: 'bold', color: 'black' }}><span style={{fontSize: '20px'}}>Formation Start Date : </span>  {formation.startDateFormation}</p>
      <p style={{ fontWeight: 'bold', color: 'black' }}><span style={{fontSize: '20px'}}>Formation Sessions Number : </span> {formation.sessionsNumber}</p>
      <p style={{ fontWeight: 'bold', color: 'black' }}><span style={{fontSize: '20px'}}>Formation Price : </span> {formation.price}</p>
      <p style={{ fontWeight: 'bold', color: 'black' }}> <span style={{fontSize: '20px'}}>Formateur : </span>{formation.formateurFirstName} {formation.formateurLastName}</p>
      </div>
    

    <form id='myForm'>
      <h5>Make An Inscription !</h5>

      <input id='studentFirstName' type='text' required placeholder='Student first name' onChange={e => setStudentFirstName(e.target.value)} style={{width: '350px', height: '50px', marginBottom:"10px"}} />

      <input id='studentLastName' type='text' required placeholder='Student last name' onChange={e => setStudentLastName(e.target.value)} style={{width: '350px', height: '50px', marginBottom:"10px"}} />

      <input type='email' required placeholder='Student email' onChange={e => setStudentEmail(e.target.value)} style={{width: '350px', height: '50px', marginBottom:"10px"}} />
      
      <input type="text" required placeholder="Student code" onChange={(e) => setStudentCode(e.target.value)}  style={{width: '350px', height: '50px', marginBottom:"10px"}}/>
      
      <select id='section' style={{width: '350px', height: '50px', marginBottom:"10px"}} required  onChange={e => setStudentSection(e.target.value)}>
        <option disabled selected value="">Please select a section</option>
        <option value='GT'>GT</option>
        <option value='GII'>GII</option>
        <option value='GEC'>GEC</option>
        <option value='IDSD'>IDSD</option>
      </select>

      <button onClick={submitInscription} disabled={isButtonDisabled}>Enroll now !</button>

      </form>

      <div className='btn btn-outline-primary' id='return-to-link'><Link to='/formations'>Return to formations page</Link></div>

    </div>
    </div>
   
  
       
   
  </div>
 

  );
} ;