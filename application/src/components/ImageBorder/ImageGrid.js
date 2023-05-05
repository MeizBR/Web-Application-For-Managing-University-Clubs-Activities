import React from 'react';
import './ImageBorder.css';
const ImageGrid = () => {
  return (
    <div className='IMGGRID'>
    <img src= 'images/Tech.jpg 'alt="Tech" style={{ width: '8%' }} />
    <img src='images/Mec.jpg ' alt="Mec" style={{ width: '8%' }} />
    <img src='images/Lab.jpg ' alt="Cyber" style={{ width: '9%' }} />
    <img src='images/hackerlog.png ' alt="hackerlog" style={{ width: '13%' }} />
    
    
    <img src='images/Web.jpg ' alt="Web" style={{ width: '10%' }} />
   
    <img src= 'images/Web developper.jpg 'alt="WEbdevoloper" style={{ width: '8%' }} />
    <img src= 'images/Cyber.jpg 'alt="Tech" style={{ width: '8%' }} />
  </div>
  );
};

export default ImageGrid;