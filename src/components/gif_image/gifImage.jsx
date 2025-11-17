import React, { useEffect, useState } from "react";

const GifImage = ({images, settime=500}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // move to the next image, loop back to start
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, settime); // change every 3 seconds

    // cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  return <img src={images[currentIndex]} alt="carousel" className="w-full h-full object-cover" />;
};

export default GifImage;
