import { React, useState, useEffect } from 'react';

export const AdminInterface = () => {

    const [studentFirstName, setStudentFirstName] = useState("")
    const [studentLastName, setStudentLastName] = useState("")
    const [studentEmail, setStudentEmail] = useState("")
    const [studentSection, setStudentSection] = useState("")
    const [studentCode, setStudentCode] = useState("")

    const addStudent = () => {
        if(
            studentFirstName.trim() !== '' &&
            studentLastName.trim() !== '' &&
            studentEmail.trim() !== '' &&
            studentEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
            studentSection !== '' &&
            studentCode.trim() !== '' &&
            !isNaN(studentCode)
        ) {

        }
    }

  return (
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
        </form>
    </div>
  )
}
