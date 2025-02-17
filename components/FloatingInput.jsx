"use client";
import React from "react";
import { useRef } from "react";
import { useState } from "react";

const FloatingInput = ({ required = true, text = "", type="text" }) => {
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleBlur = () => {
    if (inputRef.current) {
      if (!inputRef.current.value.trim() && required) {
        setError("This field is required.");
      } else {
        setError(null);
      }
    }
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <label className="relative block">
        <input
          id="email"
          className="peer w-full border border-[#e9ecef] rounded-md px-3 pt-5 pb-2 focus:outline-none leading-7 text-sm"
          placeholder=" "
          onBlur={handleBlur}
          ref={inputRef}
          type={type}
        />
        <span className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm ">
          {text}
        </span>
      </label>
      {/* <p className="mt-1 text-red-500 text-sm">Email is required</p> */}

      {error && (
        <p className="text-danger text-center  text-[0.85rem] mt-1">{error}</p>
      )}
    </div>
  );
};

export default FloatingInput;
