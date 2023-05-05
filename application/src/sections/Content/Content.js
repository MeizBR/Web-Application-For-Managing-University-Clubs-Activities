import React from 'react'
import './Content.css'
import { Clubs } from '../../components/Clubs/Clubs'
import { ClubsContent } from '../../components/ClubsContent/ClubsContent'
import { Feedback } from '../../components/Feedback/Feedback'
import ImageSlider, { Events } from '../../components/Events/Events'
import ImageCarousel from '../../components/SlideIMG/ImageCarousel';
import Clubinti from '../../components/Clubinitiate/Clubinti'

export const Content = () => {
  return (
    <div className='content-container'> 
    <div style={{ display: "flex" }}>
        <div className='Wc'>
          <Clubinti />
        </div>
        <div>
          <ImageCarousel />
        </div>
        
        
      </div> 
      <Clubs />
      <ClubsContent />
      <Events />
      <Feedback />
    </div>
  )
}
