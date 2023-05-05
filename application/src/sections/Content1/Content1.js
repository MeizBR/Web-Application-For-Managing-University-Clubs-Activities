import React from 'react'
import './Content1.css'
import ImageGrid from '../../components/ImageBorder/ImageGrid'
import Welcome from '../../components/Welcome/Welcome'
import SynthesiaVideoPlayer from '../../components/Video/Video'
export const Content1 = () => {
    return (
      
    <div >
        <div className='Front'style={{display:'flex' }} >
        <div className='margin ' style={{ marginRight: '100px',marginLeft:'170px' }}>
             <Welcome/>
        </div>
        <div className="Appcontainer">
            <SynthesiaVideoPlayer/>
        </div>
       
      </div>
           <div className='IMG'>
             <ImageGrid/>
           </div>
    </div>



    )}