import React from 'react'
import Axios from "axios"
import { useState, useEffect } from 'react'
import './Sessions.css'
export const Sessions = () => {


    // useState to make API data extraction synchronous
    const [sessions, setSession] = useState([])

    useEffect(() => {
        // call the API by Axios to display formations in the collection formations in the PFA DB here
        Axios.get("http://localhost:5000/sessions")
        .then(res => {
          setSession(res.data)
        })
      }, [])


  return (
    <div className='sessions-container'>
        <h2>The Events that will happened at the date : "03/05/2023"</h2>
        <table  className='T8'>
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Classroom</th>
                    <th>Session</th>
                    <th>StartHour</th>
                    <th>EndHour</th>
                    <th>Trainer</th>
                </tr>
            </thead>
            <tbody>
                {sessions.map(session => {
                    return(
                        <tr key={session._id}>
                            <td>{session.EventName}</td>
                            <td>{session.EventRoom}</td>
                            <td>{session.EventSession}</td>
                            <td>{session.EventStartHour}</td>
                            <td>{session.EventEndHour}</td>
                            <td>{session.formateurFirstName} {session.formateurLastName}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}