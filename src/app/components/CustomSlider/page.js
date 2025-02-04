'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";

// Import your images
import Imagen1 from "../../images/cen1.jpeg";
import Imagen2 from "../../images/render2.jpg";
import Imagen3 from "../../images/render5.jpg";

const images = [Imagen1, Imagen2, Imagen3];

export default function CustomSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[400px]">
      {images.map((img, index) => (
        <div
        key={index}
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 rounded-[10px] overflow-hidden ${
          index === currentIndex ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src={img}
          alt={`Proyecto ${index + 1}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full mx-2 ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}