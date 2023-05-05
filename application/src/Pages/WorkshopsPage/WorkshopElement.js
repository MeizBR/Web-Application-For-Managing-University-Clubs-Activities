import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios'; 
import './WorkshopElement.css'
import { Navbar } from '../../components/Navbar/Navbar';

export const WorkshopElement = () => {

  const { id } = useParams();
  const [workshop, setWorkshop] = useState([]);

  useEffect(() => {
    Axios
      .get(`http://localhost:5000/workshops/${id}`)
      .then((res) => setWorkshop(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // useState to make API data extraction synchronous : for inscriptions
  const [studentFirstName, setStudentFirstName] = useState("")
  const [studentLastName, setStudentLastName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [studentSection, setStudentSection] = useState("")
  const [studentCode, setStudentCode] = useState("");



  const [allowedCodes, setAllowedCodes] = useState([]);
  const [allowedFirstNames, setAllowedFirstNames] = useState([]);
  const [allowedLastNames, setAllowedLastNames] = useState([]);
  const [allowedSections, setAllowedSections] = useState([]);
  const [allowedEmails, setAllowedEmails] = useState([]);


  const [inscriptionsCount, setInscriptionsCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
        setAllowedEmails(emails)

      })
      .catch((err) => console.log(err));
  }, []);


    // Get the inscriptions count from the backend when component mounts
    useEffect(() => {
      if (workshop._id) {
      Axios.get(`http://localhost:5000/workshops/${workshop._id}`)
        .then(res => {
          const storedCount = res.data.inscriptionsCount;
          if (storedCount) {
            setInscriptionsCount(storedCount);
          }
        })
        .catch(err => console.log(err));
      }
    }, [workshop._id]);


  useEffect(() => {
    if (inscriptionsCount >= workshop.workshopCapacity) {
      setIsButtonDisabled(true);
    }
  }, [inscriptionsCount, workshop.workshopCapacity]);

    const submitInscription = () => {

    if (inscriptionsCount <= workshop.workshopCapacity) {
      if(
        studentFirstName.trim() !== '' &&
        studentLastName.trim() !== '' &&
        studentEmail.trim() !== '' &&
        studentEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
        studentSection !== '' &&
        !isNaN(studentCode)
      ) {
        if (
          allowedCodes.includes(Number(studentCode)) &&
          allowedFirstNames.includes(studentFirstName) &&
          allowedLastNames.includes(studentLastName) &&
          allowedSections.includes(studentSection) &&
          allowedEmails.includes(studentEmail)
        ) {
            Axios.post("http://localhost:5000/submitAnInscriptionWorkshop", {
              workshopName : workshop.workshopName,
              workshopId : workshop._id,
              formateurFirstName : workshop.formateurFirstName,
              formateurLastName : workshop.formateurLastName,
              studentFirstName : studentFirstName,
              studentLastName : studentLastName,
              studentEmail : studentEmail,
              studentSection : studentSection,
              studentCode: studentCode,
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
   <div>
    <Navbar/>
   
    <div style={{display:'flex' }}>

      <div className='workshopComponentDe'>
      <h1 className="title88">  Let's get started with your registration </h1>
      <ul className="custom-bullets">
      <li>Please fill out the form ahead </li>
      <li>Double Check all the information you inserted </li>  
      <li>Click Enroll Now to Register </li> 
      </ul>
      </div>


      <div className='workshopComponentUN'>
         <div className='Lastt'>
      <h1 className='WorkshopElementName'>{workshop.workshopName}</h1>
      <p style={{ fontWeight: 'bold', color: 'black' }}><span style={{fontSize: '20px'}}>Workshop Date : </span>{workshop.workshopDate}</p>
      <p style={{ fontWeight: 'bold', color: 'black' }}> <span style={{fontSize: '20px'}}>Workshop Room : </span>{workshop.room}</p>
      <p style={{ fontWeight: 'bold', color: 'black' }}> <span style={{fontSize: '20px'}}>Workshop Capacity : </span>{workshop.workshopCapacity}</p>
      <p style={{ fontWeight: 'bold', color: 'black' }}> <span style={{fontSize: '20px'}}>Workshop Start Hour : </span> {workshop.startHour}</p>
      <p style={{ fontWeight: 'bold', color: 'black' }}> <span style={{fontSize: '20px'}}>Formateur : </span> {workshop.formateurFirstName} {workshop.formateurLastName}</p>
      </div>

      <form>
      <h5>Make An Inscription !</h5>

      <input required type='text' placeholder='First Name' onChange={e => setStudentFirstName(e.target.value)}  style={{width: '350px', height: '50px', marginBottom:"10px"}}/> <br/>
      <input required type='text' placeholder='Last Name' onChange={e => setStudentLastName(e.target.value)}style={{width: '350px', height: '50px', marginBottom:"10px"}} /><br/>
      <input required type='email' placeholder=' Email' onChange={e => setStudentEmail(e.target.value)} style={{width: '350px', height: '50px', marginBottom:"10px"}}/><br/>
      
      
      <input required
        type="text"
        placeholder="Student code"
        onChange={(e) => setStudentCode(e.target.value)}style={{width: '350px', height: '50px', marginBottom:"10px"}}/><br/> 
      
      
      <select style={{width: '350px', height: '50px', marginBottom:"10px"}} required id='section'  onChange={e => setStudentSection(e.target.value)}>
        <option disabled selected value="">Please select a section</option>
        <option value='GT'>GT</option>
        <option value='GII'>GII</option>
        <option value='GEC'>GEC</option>
        <option value='IDSD'>IDSD</option>
      </select><br/>
      <button onClick={submitInscription} disabled={isButtonDisabled}>Enroll now !</button>
      </form> <br/>

      <div className='btn btn-outline-primary' id='return-to-link'><Link to='/workshops'>Return to workshops page</Link></div>
        
      </div>
      
    </div>
    </div>
  )
}
