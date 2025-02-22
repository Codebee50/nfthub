"use client";
import React, { useRef, useState } from "react";

const ImagePreviewSelector = ({
  initialSrc,
  onFileChanged = {},
  className = "",
}) => {
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChanged = (e) => {
    const selectedFile = e.target.files[0];
    setFilePreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
    setFile(selectedFile);
    onFileChanged(selectedFile);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <img
        src={filePreview || initialSrc}
        alt=""
        className={`cursor-pointer bg-slate-300 ${className}`}
        onClick={handleUploadClick}
      />
      <input
        type="file"
        name="file"
        id="fileInput"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChanged}
        accept="image/*"
      />
    </>
  );
};

export default ImagePreviewSelector;
