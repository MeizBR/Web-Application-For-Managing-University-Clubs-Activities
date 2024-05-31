import React from 'react'
import Axios from "axios"
import { useState, useEffect } from 'react'
import './Sessions.css'
import Calendar from 'react-calendar';

export const Sessions = () => {


    // useState to make API data extraction synchronous
    // const [sessions, setSession] = useState([])

    // useEffect(() => {
    //     // call the API by Axios to display formations in the collection formations in the PFA DB here
    //     Axios.get("/sessions")
    //     .then(res => {
    //       setSession(res.data)
    //     })
    //   }, [])

            const [selectedDate, setSelectedDate] = useState(null);
            const [sessions, setSession] = useState([]);
        
            const handleDateClick = async (date) => {
             setSelectedDate(date);
             const formattedDate = date.toISOString();
             console.log(formattedDate)
            try {
                setSession([]);
                const response = await Axios.get(`/api/sessions/${formattedDate}`);
                setSession(response.data);
            } catch (error) {
                console.error(error);
            }
            };


  return (
    <div className='sessions-container'>
        {/* <h2>The Events that will happened at the date : "03/05/2023"</h2>
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
        </table> */}


        <h2 style={{color:"gray", fontFamily:"cursive"}}>Calendar Date Picker</h2>
        <Calendar onClickDay={(date) => handleDateClick(date)} value={selectedDate} />
        {sessions.length > 0 ? (
        sessions.map((session) => (
            <div className="session-details" key={session._id}>
            <h6><span>Event Name : </span>{session.EventName}</h6>
            <h6><span>Event Nature: </span>{session.EventNature}</h6>
            <h6><span>Event Room: </span>{session.EventRoom}</h6>
            <h6><span>Event Session Number : </span>{session.EventSession}</h6>
            <h6><span>Event Start Hour: </span>{session.EventStartHour}</h6>
            <h6><span>Event End Hour: </span>{session.EventEndHour}</h6>
            <h6><span>Event Trainer: </span>{session.formateurFirstName} {session.formateurLastName}</h6>
            </div>
        ))
        ) : (
        <p>No sessions found for the selected date.</p>
        )}


    </div>
  )
}