import React from 'react'
import './Clubs.css'


export const Clubs = () => {
  return (
    <div className='container clubs-container'>
        <table class="styled-table">
          <thead>
              <tr>
                  <th style={{fontSize :"27px",letterSpacing:"3px"}}>Club name</th>
                  <th style={{fontSize :"27px" ,letterSpacing:"3px"}}>logo</th>
                  <th style={{fontSize :"27px",letterSpacing:"3px"}}> Inscription fees</th>
              </tr>
          </thead>
          <tbody>
              <tr class="active-row">
                  <td>Aero Modelisme</td>
                  <td><img className='club-photo' src='images/aero.png' alt='club image' /></td>
                  <td>15 DT</td>
              </tr>
              <tr class="active-row">
                  <td>Google Developers Students</td>
                  <td><img className='club-photo' src='images/google.png' alt='club image' /></td>
                  <td>Free</td>
              </tr>
              <tr class="active-row">
                  <td>IEEE Student Branch</td>
                  <td><img className='club-photo' src='images/ieee.jpg' alt='club image' /></td>
                  <td>46 DT</td>
              </tr>
              <tr class="active-row">
                  <td>Junior Entreprise Students</td>
                  <td><img className='club-photo' src='images/junior.jpg' alt='club image' /></td>
                  <td>35 DT</td>
              </tr>

              <tr class="active-row">
                  <td>Microsoft Tech Club ( MTC )</td>
                  <td><img className='club-photo' src='images/mtc.jpg' alt='club image' /></td>
                  <td>25 DT</td>
              </tr>
              <tr class="active-row">
                  <td>Nateg</td>
                  <td><img className='club-photo' src='images/nateg.jpg' alt='club image' /></td>
                  <td>35 DT</td>
              </tr>

              <tr class="active-row"> 
                  <td>Orbeats</td>
                  <td><img className='club-photo' src='images/orbeats.jpg' alt='club image' /></td>
                  <td>15 DT</td>
              </tr>
              <tr class="active-row">
                  <td>Robotics ( CR )</td>
                  <td><img className='club-photo' src='images/robotics.jpg' alt='club image' /></td>
                  <td>30 DT</td>
              </tr>
          </tbody>
        </table>
    </div>
  )
}
