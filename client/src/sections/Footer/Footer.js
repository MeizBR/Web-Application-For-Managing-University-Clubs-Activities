import React from 'react'
import './Footer.css'
import facebook from "../../images/social media/facebook.png"

export const Footer = () => {
  return (
    <footer>

      <h3 id='footer-title'>Enetcom Clubs : Stay Connected, Stay Motivated</h3>

      <div className='footer-container'>
       <h4 style={{margin:"20px 0", textAlign : "center", fontFamily:'serif', color : "white"}}>See where you can find our institution on Google Maps</h4>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.713642334696!2d10.753458664541025!3d34.83829168334576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13002cd2cef7333d%3A0xaa3a1cf6d7fb55b0!2sEcole%20nationale%20d&#39;Electronique%20et%20des%20T%C3%A9l%C3%A9communications%20de%20Sfax%D8%8C%20Technopole%20Sfax%2C%20Route%20Tunis%20km%2011%2C%20cite%20Ons%2C%20Sfax!5e0!3m2!1sen!2stn!4v1679510311133!5m2!1sen!2stn" width="900" height="250" id='map'></iframe>
      </div>

      <h4 style={{margin:"20px 0", textAlign : "center", fontFamily:'serif', color : "white", fontFamily:'serif'}}>You can follow your favourite clubs on Facebook and stay updated</h4>

      <table id='clubs-table'>
        <tr>
          <td>
            <img src={facebook} className='facebook-logo' />
            <a href='https://www.facebook.com/profile.php?id=100083580901407'>ENET'Com Aero Modelisme club</a>
          </td>
          <td>
            <img src={facebook} className='facebook-logo' />
            <a href='https://www.facebook.com/profile.php?id=100086159481639'>ENET'Com Google Developer Students</a>
          </td>
          <td>
            <img src={facebook} className='facebook-logo' />
            <a href='https://www.facebook.com/profile.php?id=100086159481639'>IEEE ENET'Com Students</a>
          </td>
          <td>
            <img src={facebook} className='facebook-logo' />
            <a href='https://www.facebook.com/enetcomje'>ENET'Com Junior Entreprise</a>
          </td>
        </tr>
        <tr>
          <td>
            <img src={facebook} className='facebook-logo' />
            <a href='https://www.facebook.com/mtc.enetcom'>Microsoft Tech Club ENET'Com</a>
          </td>
          <td>
            <img src={facebook} className='facebook-logo' />
            <a href='https://www.facebook.com/NATEGENETCOM'>NATEG Tunisia ENET'Com Students</a>
          </td>
          <td>
            <img src={facebook} className='facebook-logo' />
            <a href='https://www.facebook.com/RadioEnetcom'>Orbeats Club Radio ENET'Com</a>
          </td>
          <td>
            <img src={facebook} className='facebook-logo' />
            <a href='https://www.facebook.com/CR.ENETCOM'>CR ENET'Com</a>
          </td>
        </tr>
      </table>
 
      <h5 style={{textAlign : "center", marginTop : "10px", fontFamily : "fantasy", letterSpacing : "1px", color : "lightblue"}} id='credit'>Designed & Developed by : Meiez Ben Romdhane & Safouen Ghzel 2 GT 1</h5>
      <h5 style={{textAlign : "center", marginTop : "10px", fontFamily : "fantasy", letterSpacing : "1px", color : "lightblue"}}>© All copyrigths are conserved by owners</h5>

    </footer>
  )
}
