"use client";

import React, { useRef } from "react";
import { useState } from "react";


const FormInput = ({
  label = "",
  placeholder,
  name,
  type = "text",
  id,
  required = true,
  rows = 5,
  cols = 10,
  bottomDescription = null,
}) => {
  const inputClassName =
    "border border-[#e9ecef] rounded-md px-[0.75rem] py-[0.375rem] w-full outline-none mt-2";
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

  const getInputField = (type) => {
    if (type == "textarea") {
      return (
        <textarea
          name={name}
          id={name}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          className={inputClassName}
          ref={inputRef}
          onBlur={handleBlur}
        ></textarea>
      );
    }

    return (
      <input
        type={type}
        name={name}
        id={id}
        className={inputClassName}
        required={required}
        placeholder={placeholder}
        ref={inputRef}
        onBlur={handleBlur}
      />
    );
  };
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="font-semibold">
        {label} {required && <span className="text-red-700">*</span>}
      </label>

      {getInputField(type)}

      <p className="text-sm text-textmuted mt-1">{bottomDescription}</p>

      <p
        className={`text-danger text-sm mt-1 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error || '-'}
      </p>
    </div>
  );
};

export default FormInput;
