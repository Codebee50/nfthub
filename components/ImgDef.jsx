import React, { useState } from "react";
import defaultImg from "@/public/profile-picture.png";

const ImgDef = ({ src, className = "", alt="Profile" }) => {
  const [imageSrc, setImageSrc] = useState(src || defaultImg.src);

  return (
    <img
      src={imageSrc}
      className={`object-cover object-center ${className}`}
      onError={() => setImageSrc(defaultImg.src)}
      alt={alt}
    />
  );
};

export default ImgDef;
