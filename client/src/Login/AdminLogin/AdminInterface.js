import { React, useState, useEffect } from 'react';
import Axios from "axios"; 
import InscriptionsFormationsTable from '../../Pages/Organisation/InscriptionsFormationsTable';
import InscriptionsWorkshopsTable from '../../Pages/Organisation/InscriptionsWorkshopsTable';
import { Feedback } from '../../components/Feedback/Feedback';
import { FeedbackWorkshop } from '../../components/Feedback/FeedbackWorkshop';
import { Footer } from '../../sections/Footer/Footer';
import './AdminInterface.css';
import { AdminTrainings } from './AdminTrainings';
import { Link } from 'react-router-dom';

export const AdminInterface = () => {

    const [students, setStudent] = useState([]);

    useEffect(() => {
        Axios
          .get("http://localhost:5000/api/students")
          .then((res) => setStudent(res.data))
          .catch((err) => console.log(err));
      });


    const [studentFirstName, setStudentFirstName] = useState("")
    const [studentLastName, setStudentLastName] = useState("")
    const [studentEmail, setStudentEmail] = useState("")
    const [studentSection, setStudentSection] = useState("")
    const [studentCode, setStudentCode] = useState("")

    const [currentStudent, setCurrentStudent] = useState(null);

    const addStudent = (e) => {
        e.preventDefault();
        if(
            studentFirstName.trim() !== '' &&
            studentLastName.trim() !== '' &&
            studentEmail.trim() !== '' &&
            studentEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
            studentSection !== '' &&
            studentCode.trim() !== '' &&
            !isNaN(studentCode)
        ) {
            const capitalizedFirstName = studentFirstName.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
            const capitalizedLastName = studentLastName.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
            const upperCasedsection = studentSection.toUpperCase();
            Axios.post("http://localhost:5000/api/addStudent", {
                    studentFirstName : capitalizedFirstName,
                    studentLastName : capitalizedLastName,
                    studentEmail : studentEmail,
                    studentSection : upperCasedsection,
                    studentCode: studentCode,
                })
                .then(res => {
                    console.log(res.data);
                    window.alert("Student Created Successfully");
                    setStudentFirstName("");
                    setStudentLastName("");
                    setStudentEmail("");
                    setStudentSection("");
                    setStudentCode("");
                    document.getElementById("add-student-form").reset();
                })
                .catch((err) => {
                    if (err.response && err.response.status === 400) {
                      alert("Student already exists");
                      document.getElementById("add-student-form").reset();
                    } else {
                      console.log(err);
                      alert("An error occurred. Please try again later.");
                    }
                  });
        }
    }

    const deleteStudent = async (id) => {
        try {
          const response = await Axios.delete(`http://localhost:5000/api/students/${id}`);
      
          // If the request is successful, remove the student from the state
          if (response.status === 200) {
            setStudent(students.filter((student) => student._id !== id));
            window.alert("Student Removed Successfully");
          }
        } catch (err) {
          console.error(err);
          alert('An error occurred while deleting the student. Please try again later.');
        }
      };

      const updateStudent = (student) => {
        setCurrentStudent(student);
      };
      
      
      const handleUpdate = async (event) => {
        event.preventDefault();
      
        try {
          const response = await Axios.put(`http://localhost:5000/api/students/${currentStudent._id}`, currentStudent);
      
          if (response.status === 200) {
            // Update the student information in the state
            setStudent(students.map((student) => (student._id === currentStudent._id ? currentStudent : student)));
            setCurrentStudent(null); // Clear the current student
            alert("Student updated successfully");
          }
        } catch (err) {
          console.error(err);
          alert("An error occurred while updating the student");
        }
    }
      

  return (
    <div>
      <button id='logout-button' type="button" class="btn btn-light"><Link to="/admin">Logout</Link></button>
    <h3 className='text-success mt-4'>Administrator Interface</h3>
    <div>
        <form id='add-student-form'>
            <h4 className='text-dark'>Add a Student to Our Family</h4>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@ Student</span>
                <input type="text" class="form-control" placeholder="Student First Name" aria-label="Username" aria-describedby="addon-wrapping" required onChange={e => setStudentFirstName(e.target.value)} />
            </div>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@ Student</span>
                <input type="text" class="form-control" placeholder="Student Last Name" aria-label="Username" aria-describedby="addon-wrapping" required onChange={e => setStudentLastName(e.target.value)} />
            </div>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@ Student</span>
                <input type="text" class="form-control" placeholder="Student Email" aria-label="Username" aria-describedby="addon-wrapping" required onChange={e => setStudentEmail(e.target.value)} />
            </div>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@ Student</span>
                <input type="text" class="form-control" placeholder="Student Section" aria-label="Username" aria-describedby="addon-wrapping" required onChange={e => setStudentSection(e.target.value)} />
            </div>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">@ Student</span>
                <input type="number" class="form-control" placeholder="Student Secret Code" aria-label="Username" aria-describedby="addon-wrapping" required onChange={e => setStudentCode(e.target.value)} />
            </div>
            <button class="btn btn-primary mt-1" type="submit" onClick={addStudent}>Add Student</button>
        </form>

        <h3>Students List</h3>

        <div className="row">
            {students.map(student => {
                return(
                    <div className="col-3" key={student._id}>
                    <div className="card" style={{width:"97%", margin:"5px"}}>
                        <ul class="list-group list-group-flush">
                            <li className="list-group-item">Full Name : {student.studentFirstName} {student.studentLastName}</li>
                            <li className="list-group-item">Section : {student.studentSection}</li>
                            <li className="list-group-item">Email : {student.studentEmail}</li>
                            <li className="list-group-item">Code : {student.studentCode}</li>
                        </ul>
                        <div class="card-footer">
                            <button className="btn btn-primary mt-1" onClick={() => updateStudent(student)}>Update Student</button>
                            <button class="btn btn-primary mt-1" type="submit" onClick={() => deleteStudent(student._id)}>Delete Student</button>
                        </div>
                    </div>
                    </div>
                )
            })}
        </div>

        {currentStudent && (
  <div>
    <h2>Update Student</h2>
    <form onSubmit={handleUpdate}>
      <label style={{border:"2px solid steelblue", padding:"10px", width:"70%", marginBottom:"10px", marginLeft:"150px"}}>
        First Name:
        <input style={{width:"100%"}} type="text" value={currentStudent.studentFirstName} onChange={(event) => setCurrentStudent({ ...currentStudent, studentFirstName: event.target.value })} />
      </label>
      <br />
      <label style={{border:"2px solid steelblue", padding:"10px", width:"70%", marginBottom:"10px", marginLeft:"150px"}}>
        Last Name:
        <input style={{width:"100%"}} type="text" value={currentStudent.studentLastName} onChange={(event) => setCurrentStudent({ ...currentStudent, studentLastName: event.target.value })} />
      </label>
      <br />
      <label style={{border:"2px solid steelblue", padding:"10px", width:"70%", marginBottom:"10px", marginLeft:"150px"}}>
        Email:
        <input style={{width:"100%"}} type="text" value={currentStudent.studentEmail} onChange={(event) => setCurrentStudent({ ...currentStudent, studentEmail: event.target.value })} />
      </label>
      <br />
      <label style={{border:"2px solid steelblue", padding:"10px", width:"70%", marginBottom:"10px", marginLeft:"150px"}}>
        Section:
        <input style={{width:"100%"}} type="text" value={currentStudent.studentSection} onChange={(event) => setCurrentStudent({ ...currentStudent, studentSection: event.target.value })} />
      </label>
      <br />
      <label style={{border:"2px solid steelblue", padding:"10px", width:"70%", marginBottom:"10px", marginLeft:"150px"}}>
        Code:
        <input style={{width:"100%"}} type="text" value={currentStudent.studentCode} onChange={(event) => setCurrentStudent({ ...currentStudent, studentCode: event.target.value })} />
      </label>
      <br />
      <button class="btn btn-primary mt-1 mb-5" style={{marginLeft:"150px"}} type="submit">Update</button>
    </form>
  </div>
)}









<AdminTrainings />









    <div className='mt-5' id='inscription-section'>
        <h3>Check The Inscriptions By Students</h3>
        <InscriptionsFormationsTable />
        <br /><br />
        <InscriptionsWorkshopsTable />
    </div>

    <div id='feedbacks-sections'>
        <Feedback />
        <FeedbackWorkshop />
    </div>

    </div>
    <Footer />
    </div>
  )
}
