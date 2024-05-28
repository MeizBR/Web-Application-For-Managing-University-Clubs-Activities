import React, { useState, useEffect } from "react";
import './ImageCarousel.css';

const images = [
    "aero.png",
    "mtc.jpg",
    "robotics.jpg",
    "ieee.jpg",
    "nateg.jpg",
    "orbeats.jpg",
 
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1400);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="carousel-container container">
      <img src={`images/${images[currentIndex]}`} alt={`Image ${currentIndex}`} />
    </div>
  );
};

export default ImageSlider;