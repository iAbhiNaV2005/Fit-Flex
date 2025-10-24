import React, { useState, useEffect } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const LandingPage = () => {
  const images = [
    { id: 1, src: img1 },
    { id: 2, src: img2 },
    { id: 3, src: img3 },
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <header className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
      {images.map((img, index) => (
        <div
          key={img.id}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${img.src})`,
            opacity: index === currentImage ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center px-4">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 " 
        >
          Sweat, Smile, <span className="text-rose-400">Repeat</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
          Your ultimate guide to fitness. Explore thousands of exercises with
          instructions to achieve your goals.
        </p>
        <button
          onClick={() =>
            document
              .getElementById("exercises-section")
              ?.scrollIntoView({behavior : "smooth"})
          }
          className="bg-rose-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-rose-600 transition-transform transform hover:scale-105"
        >
          Explore Exercises
        </button>
      </div>
    </header>
  );
};

export default LandingPage;
